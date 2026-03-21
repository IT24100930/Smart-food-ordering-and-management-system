package com.smartfood.controller;




import com.smartfood.dto.response.MenuDTO;
import com.smartfood.entity.MenuModel;
import com.smartfood.service.MenuServices;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.List;

@RestController
@RequestMapping("/API/V1/Menu")
@CrossOrigin(origins = "http://localhost:5173")
public class MenuController {

    @Autowired
    private MenuServices menuServices;

    @PostMapping("/AddMenu")
    public MenuModel addMenu(@RequestBody MenuDTO menuDTO) {
        try{
            return menuServices.addMenu(menuDTO);
        }catch(Exception e){
            throw new RuntimeException(e.getMessage());
        }
    }

    @GetMapping("/allMenu")
    public List<MenuDTO> getAllMenus(){
        try{
            return menuServices.getAllMenu();
        }catch(Exception e){
            throw new RuntimeException(e.getMessage());
        }
    }

    @GetMapping("/ByCategory")
    public List<MenuDTO> getAllMenusByCategory(@RequestParam String category){
        try{
            return menuServices.getMenuByCategory(category);
        }catch(Exception e){
            throw new RuntimeException(e.getMessage());
        }
    }

    @PutMapping("/update")
    public MenuDTO updateMenu(@RequestBody MenuDTO menuDTO) {
        try{
            return menuServices.updateMenu(menuDTO);
        }catch (Exception e){
            throw new RuntimeException(e.getMessage());
        }
    }

    @DeleteMapping("/deleteMenu")
    public MenuDTO deleteMenu(@RequestParam long id){
        try{
            return menuServices.deleteMenu(id);
        }
        catch(Exception e){
            throw new RuntimeException(e.getMessage());
        }
    }

    @PutMapping("/updateStates")
    public MenuDTO updateStates(@RequestParam long id, @RequestParam Boolean state){
        try{
            return menuServices.UpdateState(id, state);
        }catch(Exception e){
            throw new RuntimeException(e.getMessage());
        }
    }


}
