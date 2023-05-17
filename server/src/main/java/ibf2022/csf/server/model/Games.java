package ibf2022.csf.server.model;

import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;

import jakarta.json.Json;
import jakarta.json.JsonObject;

public class Games {
    
    private Integer limit;
    private Integer offset;
    private Integer total;
    private LocalDate timestamp;
    private List<Game> gameList = new ArrayList<>();
    
    public Integer getLimit() {
        return limit;
    }
    public void setLimit(Integer limit) {
        this.limit = limit;
    }
    public Integer getOffset() {
        return offset;
    }
    public void setOffset(Integer offset) {
        this.offset = offset;
    }
    public Integer getTotal() {
        return total;
    }
    public void setTotal(Integer total) {
        this.total = total;
    }
    public LocalDate getTimestamp() {
        return timestamp;
    }
    public void setTimestamp(LocalDate timestamp) {
        this.timestamp = timestamp;
    }
    public List<Game> getGameList() {
        return gameList;
    }
    public void setGameList(List<Game> gameList) {
        this.gameList = gameList;
    }

    public Games() {
    }
    
    public Games(Integer limit, Integer offset, Integer total, LocalDate timestamp, List<Game> gameList) {
        this.limit = limit;
        this.offset = offset;
        this.total = total;
        this.timestamp = timestamp;
        this.gameList = gameList;
    }

    public JsonObject toJson() {
        return Json.createObjectBuilder()
        .add("limit", getLimit())
        .add("offset", getOffset())
        .add("total", getTotal())
        .add("timestamp", getTimestamp().toString())
        .add("gameList", getGameList().toString())
        .build(); 
    }
    
}