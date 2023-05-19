package ibf2022.csf.server.repository;

import java.util.List;

import org.bson.Document;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.data.domain.Sort.Direction;
import org.springframework.data.mongodb.core.MongoTemplate;
import org.springframework.data.mongodb.core.query.Criteria;
import org.springframework.data.mongodb.core.query.Query;
import org.springframework.stereotype.Repository;

import ibf2022.csf.server.model.Game;

@Repository
public class BoardGamesRepository {
    
    @Autowired
    MongoTemplate template;

    public List<Game> getAllGames(Integer limit, Integer offset) {
        Query query = new Query();
        Pageable pageable = PageRequest.of(offset, limit);
        query.with(pageable);
        // Query query = Query.query(Criteria.where("gid").exists(true)).limit(limit).skip(offset);

        return template.find(query, Document.class, "boardgames").stream().map(d -> Game.create(d)).toList();
    }

    public List<Game> getBoardGamesByName(String name) {
        Query query = new Query();
        query.addCriteria(Criteria.where("name").regex(name, "i"));
        query.with(Sort.by(Direction.ASC, "gid")).limit(50);
        
        return template.find(query, Document.class, "boardgames").stream().map(d -> Game.create(d)).toList();
    }
}
