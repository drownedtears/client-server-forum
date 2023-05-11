package ru.doketov.forum.service.article;

import ru.doketov.forum.model.dto.ArticleRequest;
import ru.doketov.forum.model.dto.ArticleResponse;
import ru.doketov.forum.model.entity.Article;
import ru.doketov.forum.model.dto.FindArticle;

import java.util.List;

public interface ArticleService {

    List<ArticleResponse> getAllArticles();

    void deleteArticle(Long id);

    List<ArticleResponse> getArticlesByHeader(String header);

    ArticleResponse saveArticle(ArticleRequest article, String username);

    ArticleResponse rate(ArticleRequest article);
}
