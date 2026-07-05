package domain

type Recipe struct {
	Mode        string   `json:"mode"`        // "ingredients" or "random"
	Ingredients []string `json:"ingredients"` // ["豚肉", "キャベツ"]
	Tags        []string `json:"tags"`        // ["包丁いらず", "レンジだけ"]
}
