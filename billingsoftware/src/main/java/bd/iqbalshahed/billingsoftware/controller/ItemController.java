package bd.iqbalshahed.billingsoftware.controller;

import bd.iqbalshahed.billingsoftware.io.ItemRequest;
import bd.iqbalshahed.billingsoftware.io.ItemResponse;
import bd.iqbalshahed.billingsoftware.service.ItemService;
import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.JsonMappingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.server.ResponseStatusException;

import java.util.List;

@RestController
@RequiredArgsConstructor
public class ItemController {

    private final ItemService itemService;

    @PostMapping("/admin/items")
    @ResponseStatus(HttpStatus.CREATED)
    public ItemResponse addItem(@RequestPart("item") String itemString, @RequestPart("file")MultipartFile file) {
        ObjectMapper objectMapper = new ObjectMapper();
        ItemRequest itemRequest = null;

        try{
            itemRequest = objectMapper.readValue(itemString, ItemRequest.class);
            return itemService.add(itemRequest, file);
        } catch (JsonMappingException e) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, e.getMessage());
        } catch (JsonProcessingException e) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, e.getMessage());
        }
    }

    @GetMapping("/items")
    public List<ItemResponse> readItems() {
        return itemService.read();
    }

    @DeleteMapping("/admin/items/{itemId}")
    @ResponseStatus(HttpStatus.NO_CONTENT)
    public void deleteItem(@PathVariable String itemId){
        try{
            itemService.delete(itemId);
        } catch (Exception e) {
            throw new ResponseStatusException(HttpStatus.NOT_FOUND, e.getMessage());
        }
    }
}
