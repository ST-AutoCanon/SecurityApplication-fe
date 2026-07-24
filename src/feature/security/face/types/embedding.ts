export interface FaceEmbedding {
  /**
   * ArcFace embedding vector (typically 512 dimensions).
   */
  vector: Float32Array;

  /**
   * Embedding dimension.
   */
  dimension: number;

  /**
   * Model name.
   */
  model: string;

  /**
   * Created timestamp.
   */
  createdAt: number;
}

export interface EmbeddingComparison {
  cosine: number;
  euclidean: number;
  matched: boolean;
  confidence: number;
}

export interface EmbeddingTemplate {
  id: string;
  name?: string;
  embedding: FaceEmbedding;
  metadata?: Record<string, unknown>;
}