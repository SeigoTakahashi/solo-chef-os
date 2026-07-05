package usecase

import (
	"context"
	"solo-chef-os-backend/internal/domain"
)
type RecipeUsecase struct {
	recipeRepository domain.RecipeRepository
}

func NewRecipeUsecase(recipeRepository domain.RecipeRepository) *RecipeUsecase {
	return &RecipeUsecase{
		recipeRepository: recipeRepository,
	}
}

func (u *RecipeUsecase) FetchRecipe(ctx *context.Context, req *domain.RecipeRequest) (*domain.Recipe, error) {
	return u.recipeRepository.FetchRecipe(ctx, req)
}