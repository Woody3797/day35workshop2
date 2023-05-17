package ibf2022.csf.server.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;

import ibf2022.csf.server.model.Game;
import ibf2022.csf.server.repository.BoardGamesRepository;
import jakarta.json.Json;
import jakarta.json.JsonArray;
import jakarta.json.JsonObject;

@Controller
@RequestMapping(produces = MediaType.APPLICATION_JSON_VALUE)
@CrossOrigin(origins = "*")
public class BoardGamesController {
    
    @Autowired
    BoardGamesRepository repository;

    @GetMapping(path = "/games")
    public ResponseEntity<String> getAllBoardGames(@RequestParam(defaultValue = "20") Integer limit, @RequestParam(defaultValue = "0") Integer offset) {
        List<Game> listGames = repository.getAllGames(limit, offset);
        List<JsonObject> games = listGames.stream().map(g -> g.toJson()).toList();
        JsonArray result = Json.createArrayBuilder(games).build();
        
        return ResponseEntity.status(HttpStatus.OK).contentType(MediaType.APPLICATION_JSON).body(result.toString());
    }

    @GetMapping(path = "/gamesname")
    public ResponseEntity<String> getBoardGamesByName(@RequestParam String name) {
        List<Game> listGames = repository.getBoardGamesByName(name);
        List<JsonObject> games = listGames.stream().map(g -> g.toJson()).toList();
        JsonArray result = Json.createArrayBuilder(games).build();
        
        return ResponseEntity.status(HttpStatus.OK).contentType(MediaType.APPLICATION_JSON).body(result.toString());
    }

}
