/**
 * Result type wraps the outcome of an operation.
 * It returns an "ok" response with a value or an "error" response.
 */
export type Result<Ok, Err = Error> =
  | { ok: true; value: Ok }
  | { ok: false; error: Err };

/**
 * Paginated type is useful for list responses.
 */
export type Paginated<T> = {
  data: T[];
  total: number;
  limit: number;
  offset: number;
};

/**
 * Category represents a quiz category.
 */
export type Category = {
  id: number;
  name: string;
  slug: string;
};

/**
 * CategoryToCreate is used when creating a new category.
 */
export type CategoryToCreate = {
  name: string;
};

/**
 * CategoryCreateResult represents the result of creating a category.
 */
export type CategoryCreateResult =
  | { created: true; category: Category }
  | { created: false; category?: Category; reason: 'exists' | 'invalid-slug' };

/**
 * Answer represents a possible answer to a question.
 */
export type Answer = {
  id: number;
  text: string;
  correct: boolean;
};

/**
 * AnswerToCreate is used when creating an answer.
 */
export type AnswerToCreate = {
  text: string;
  correct: boolean;
};

/**
 * Question represents a quiz question along with its answers and associated category.
 */
export type Question = {
  id: number;
  text: string;
  answers: Answer[];
  category: Category;
};

/**
 * QuestionToCreate is used when creating a new question.
 */
export type QuestionToCreate = {
  text: string;
  categoryId: number;
  answers: AnswerToCreate[];
};

/**
 * QuestionCreateResult represents the result of creating a question.
 */
export type QuestionCreateResult =
  | { created: true; question: Question }
  | { created: false; reason: 'invalid-category' | 'invalid-answers' };

/**
 * LimitOffset type for paginated API calls.
 */
export type LimitOffset = {
  limit: number;
  offset: number;
};

/**
 * Branded type for a slug. It helps ensure a slug is valid.
 */
export type Slug = string & { __brand: 'slug' };

/**
 * Branded type for an Id. It ensures the id is a positive integer.
 */
export type Id = number & { __brand: 'id' };

/**
 * (Optional) Interfaces to standardize API operations.
 * You might use these in your API helper functions.
 */
export interface ICategory {
  getCategories(limitOffset: LimitOffset): Promise<Result<Paginated<Category>>>;
  getCategoryBySlug(slug: Slug): Promise<Result<Category | null>>;
  createCategory(category: CategoryToCreate): Promise<Result<CategoryCreateResult>>;
  updateCategory(slug: Slug, category: CategoryToCreate): Promise<Result<Category | null>>;
  deleteCategory(slug: Slug): Promise<Result<boolean | null>>;
}

export interface IQuestions {
  getQuestions(limitOffset: LimitOffset, categorySlug?: string): Promise<Result<Paginated<Question>>>;
  getQuestionById(id: Id): Promise<Result<Question | null>>;
  createQuestion(question: QuestionToCreate): Promise<Result<QuestionCreateResult>>;
  updateQuestion(id: Id, question: QuestionToCreate): Promise<Result<Question | null>>;
  deleteQuestion(id: Id): Promise<Result<boolean | null>>;
}
