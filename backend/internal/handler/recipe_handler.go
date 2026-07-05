package handler

import (
	"net/http"
	"solo-chef-os-backend/internal/domain"
	"solo-chef-os-backend/internal/usecase"

	"github.com/labstack/echo/v5"
)

type RecipeHandler struct {
	recipeUsecase *usecase.RecipeUsecase
}

func NewRecipeHandler(recipeUsecase *usecase.RecipeUsecase) *RecipeHandler {
	return &RecipeHandler{
		recipeUsecase: recipeUsecase,
	}
}

func (h *RecipeHandler) FetchRecipe(c *echo.Context) error {
	req := &domain.RecipeRequest{}
	// リクエストのバインドとバリデーション
	if err := c.Bind(req); err != nil {
		return c.JSON(http.StatusBadRequest, map[string]string{"error": "Invalid request"})
	}
	if err := c.Validate(req); err != nil {
		return c.JSON(http.StatusBadRequest, map[string]string{"error": "Validation failed"})
	}

	// ユースケースを呼び出してレシピを取得
	ctx := c.Request().Context()
	recipe, err := h.recipeUsecase.FetchRecipe(&ctx, req)
	if err != nil {
		return c.JSON(http.StatusInternalServerError, map[string]string{"error": "Failed to fetch recipe"})
	}
	return c.JSON(http.StatusOK, recipe)
}