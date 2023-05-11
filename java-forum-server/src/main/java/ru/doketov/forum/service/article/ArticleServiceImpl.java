package ru.doketov.forum.service.article;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import ru.doketov.forum.dao.ArticleRepository;
import ru.doketov.forum.dao.UserRepository;
import ru.doketov.forum.model.dto.ArticleRequest;
import ru.doketov.forum.model.dto.ArticleResponse;
import ru.doketov.forum.model.entity.Article;
import ru.doketov.forum.model.dto.FindArticle;

import java.time.ZoneId;
import java.time.ZonedDateTime;
import java.time.format.DateTimeFormatter;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class ArticleServiceImpl implements ArticleService {

    private final ArticleRepository articleRepository;

    private final UserRepository userRepository;

    @Autowired
    public ArticleServiceImpl(ArticleRepository articleRepository, UserRepository userRepository) {
        this.articleRepository = articleRepository;
        this.userRepository = userRepository;
    }

    @Override
    public List<ArticleResponse> getAllArticles() {
        return articleRepository.findByOrderByRatingDesc().stream()
                .map(this::toArticleResponse)
                .collect(Collectors.toList());
    }

    @Override
    public void deleteArticle(Long id) {
        articleRepository.delete(articleRepository.getArticleById(id));
    }

    @Override
    public List<ArticleResponse> getArticlesByHeader(String header) {
        return articleRepository.findArticlesByHeader(header).stream()
                .map(this::toArticleResponse)
                .toList();
    }

    @Override
    public ArticleResponse saveArticle(ArticleRequest article, String username) {
        Article articleDb = new Article();
        articleDb.setHeader(article.getHeader().trim());
        articleDb.setContent(article.getContent().trim());
        articleDb.setUser(userRepository.getUserByUsername(username));
        articleDb.setRating(0);

        String timePattern = "dd:MM:YYYY";
        ZonedDateTime curTime = ZonedDateTime.now(ZoneId.of( "Europe/Moscow"));
        DateTimeFormatter dateTimeFormatter = DateTimeFormatter.ofPattern(timePattern);
        articleDb.setCre_date(curTime.format(dateTimeFormatter));

        articleRepository.save(articleDb);

        return toArticleResponse(articleDb);
    }

    @Override
    public ArticleResponse rate(ArticleRequest article) {
        Article articleDb = toArticle(article);
        articleDb.setRating(article.getRating());
        return toArticleResponse(articleRepository.save(articleDb));
    }

    private ArticleResponse toArticleResponse(Article article) {
        return new ArticleResponse(article.getId(), article.getHeader(), article.getContent(), article.getRating(),
                article.getCre_date(), article.getUser().getUsername(), article.getUser().getId());
    }

    private Article toArticle(ArticleRequest articleRequest) {
        return articleRepository.getArticleById(articleRequest.getId());
    }
}
