from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.metrics.pairwise import cosine_similarity
from typing import List, Tuple


def compute_match(description: str, candidates: List[Tuple[str, List[str]]]):
    corpus = [description] + [" ".join(skills) for _, skills in candidates]
    vectorizer = TfidfVectorizer(stop_words="english")
    tfidf = vectorizer.fit_transform(corpus)
    scores = cosine_similarity(tfidf[0:1], tfidf[1:]).flatten()
    return scores


def best_match(description: str, candidates: List[Tuple[str, List[str]]]):
    scores = compute_match(description, candidates)
    best_index = int(scores.argmax()) if len(scores) > 0 else -1
    if best_index == -1:
        return None
    user_id = candidates[best_index][0]
    score = float(scores[best_index])
    rationale = "TF-IDF similarity on skill tags"
    return user_id, score, rationale
