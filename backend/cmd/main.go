package main

import (
	"net/http"
	"os"
	"solo-chef-os-backend/internal/handler"
	"solo-chef-os-backend/internal/infrastructure"
	"solo-chef-os-backend/internal/usecase"
	"time"

	"github.com/go-playground/validator/v10"
	"github.com/joho/godotenv"
	"github.com/labstack/echo/v5"
	"github.com/labstack/echo/v5/middleware"
)

// バリデーションのカスタムバリデータを定義
type CustomValidator struct {
	validator *validator.Validate
}

func (cv *CustomValidator) Validate(i interface{}) error {
    if err := cv.validator.Struct(i); err != nil {
        return echo.NewHTTPError(http.StatusBadRequest, err.Error())
    }
    return nil
}

func main() {
	// 環境変数の読み込み
	_ = godotenv.Load()
	difyAPIKey := os.Getenv("DIFY_API_KEY")
	frontendUrl := os.Getenv("FRONTEND_URL")
	port := os.Getenv("PORT")


	// Infrastructureの初期化
	difyGateway := infrastructure.NewDifyGateway(difyAPIKey, "https://api.dify.ai/v1")

	// Usecaseの初期化
	recipeUsecase := usecase.NewRecipeUsecase(difyGateway)

	// Handlerの初期化
	recipeHandler := handler.NewRecipeHandler(recipeUsecase)

	// Echoの初期化
	e := echo.New()
	
	// カスタムバリデータの設定
	e.Validator = &CustomValidator{validator: validator.New()}

	// ミドルウェアの設定
	// ログ出力の設定
	e.Use(middleware.RequestLogger())
	// CORSの設定
	e.Use(middleware.CORSWithConfig(middleware.CORSConfig{
		AllowOrigins: []string{frontendUrl, "http://localhost:5173"}, 
		AllowMethods: []string{http.MethodGet, http.MethodPost, http.MethodOptions}, 
		AllowHeaders: []string{echo.HeaderOrigin, echo.HeaderContentType, echo.HeaderAccept, echo.HeaderAuthorization}, 
	}))

	// レートリミットの設定
	config := middleware.RateLimiterConfig{
        Skipper: middleware.DefaultSkipper,
        Store: middleware.NewRateLimiterMemoryStoreWithConfig(
            middleware.RateLimiterMemoryStoreConfig{
                Rate:      0.2,            // 5秒に1回リクエスト枠が回復（1分で12回）
                Burst:     3,              // 連続で許容するのは最大3回まで
                ExpiresIn: 3 * time.Minute,
            },
        ),
        IdentifierExtractor: func(ctx *echo.Context) (string, error) {
            return ctx.RealIP(), nil
        },
        ErrorHandler: func(context *echo.Context, err error) error {
            return context.JSON(http.StatusTooManyRequests, map[string]string{
                "message": "リクエスト制限を超えました。しばらく時間をおいて試してください。",
            })
        },
        DenyHandler: func(context *echo.Context, identifier string, err error) error {
            return context.JSON(http.StatusTooManyRequests, map[string]string{
                "message": "リクエスト制限を超えました。しばらく時間をおいて試してください。",
            })
        },
    }
    e.Use(middleware.RateLimiterWithConfig(config))


	e.GET("/", func(c *echo.Context) error {
		return c.String(http.StatusOK, "Hello, Solo Chef OS Backend!")
	})

	e.POST("/recipe", recipeHandler.FetchRecipe)

	if err := e.Start(":" + port); err != nil {
		e.Logger.Error("failed to start server", "error", err)
	}
}