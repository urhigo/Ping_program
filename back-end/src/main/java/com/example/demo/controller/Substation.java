package com.example.demo.controller;

import com.example.demo.models.SubstationModel;
import com.example.demo.service.SubstationService;
import com.example.demo.service.exception.CustomException;
import com.example.demo.service.exception.IpWrongFormException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/substation")
@CrossOrigin("http://localhost:3000")
public class Substation {

    @Autowired
    SubstationService substationService;

    @GetMapping("/creation_substation")
    public void creationSubstation(){
    }

    @PostMapping("/add_new_substation")
    public void addNewSubstation(@RequestBody SubstationModel substation) throws CustomException {
        substationService.saveSubstation(substation);
    }

    @GetMapping("/list_all_substation")
    public List<SubstationModel> allSubstation(){
        return substationService.allSubstation();
    }

    @PutMapping("/edit_information/{id}")
    public void editInformation(@PathVariable long id, @RequestBody SubstationModel substation){
        substationService.editSubstation(id, substation);
    }

    @GetMapping("/{id}")
    public SubstationModel informationAboutSubstation(@PathVariable long id){
        return substationService.oneSubstation(id);
    }

    @DeleteMapping("/{id}")
    public void deleteSubstation(@PathVariable long id){
        substationService.deleteSubstation(id);
    }

}
