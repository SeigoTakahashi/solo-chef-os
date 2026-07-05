package domain

type RecipeRequest struct {
	Mode        string   `json:"mode"`        // "ingredients" or "random"
	Ingredients []string `json:"ingredients"` // ["豚肉", "キャベツ"]
	Tags        []string `json:"tags"`        // ["包丁いらず", "レンジだけ"]
}

type Ingredient struct {
	Name     string `json:"name"`
	Amount   string `json:"amount"`
}

type Recipe struct {
	Title       string       `json:"title"`       // "豚肉とキャベツのレンジ蒸し"
	Ingredients []Ingredient `json:"ingredients"` // [{"name": "豚肉", "amount": "200g"}, {"name": "キャベツ", "amount": "1/4個"}]
	Steps       []string     `json:"steps"`       // ["キャベツをざく切りにする", "耐熱容器にキャベツと豚肉を入れ、ラップをしてレンジで5分加熱する"]
}

type RecipeRepository interface {
	FetchRecipe(req *RecipeRequest) (*Recipe, error)
}

