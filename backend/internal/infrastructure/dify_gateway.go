package infrastructure

import (
	"bytes"
	"context"
	"encoding/json"
	"fmt"
	"io"
	"net/http"
	"solo-chef-os-backend/internal/domain"
	"time"
)

type DifyGateway struct {
	apiKey string 
	baseUrl string
	client *http.Client
}

func NewDifyGateway(apiKey string, baseUrl string) *DifyGateway {
	return &DifyGateway{
		apiKey: apiKey,
		baseUrl: baseUrl,
		client: &http.Client{
			Timeout: 60 * time.Second,
		},
	}
}

type difyRequestBody struct {
	Inputs       *domain.RecipeRequest `json:"inputs"` 
	User         string                `json:"user"`
	ResponseMode string                `json:"response_mode"`
}

type difyRawResponse struct {
	Data struct {
		Outputs struct {
			Result string `json:"result"` 
		} `json:"outputs"`
	} `json:"data"`
}


func (g *DifyGateway) FetchRecipe(ctx *context.Context, req *domain.RecipeRequest) (*domain.Recipe, error) {
	// Difyの共通仕様に合わせてデータを成形
	bodyObj := difyRequestBody{
		Inputs:       req,
		User:         "solochef-user-1",
		ResponseMode: "blocking",
	}

	jsonBody, err := json.Marshal(bodyObj)
	if err != nil {
		return nil, err
	}

	// HTTPリクエストの作成
	httpReq, err := http.NewRequestWithContext(*ctx, "POST", g.baseUrl+"/workflows/run", bytes.NewBuffer(jsonBody))
	if err != nil {
		return nil, err
	}

	httpReq.Header.Set("Authorization", "Bearer "+g.apiKey)
	httpReq.Header.Set("Content-Type", "application/json")

	// 実行
	resp, err := g.client.Do(httpReq)
	if err != nil {
		return nil, err
	}
	defer resp.Body.Close()

	// レスポンスの読み込み
	bodyBytes, err := io.ReadAll(resp.Body)
	if err != nil {
		return nil, err
	}

	// ステータスコードが200以外の場合はエラーとして扱う
	if resp.StatusCode != http.StatusOK {
        return nil, fmt.Errorf("dify api error: status %d, body: %s", resp.StatusCode, string(bodyBytes))
    }

	// Difyのレスポンスをパースして、必要な部分を抽出
	var difyResp difyRawResponse
	if err := json.Unmarshal(bodyBytes, &difyResp); err != nil {
		return nil, err
	}

	// 抽出した結果をRecipe構造体に変換して返す
	var recipe domain.Recipe
	if err := json.Unmarshal([]byte(difyResp.Data.Outputs.Result), &recipe); err != nil {
		return nil, err
	}

	return &recipe, nil
}