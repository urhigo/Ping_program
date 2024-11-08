package com.example.demo.service;

import com.example.demo.models.SubstationModel;
import com.example.demo.repository.SubstationRepository;
import com.example.demo.service.exception.CustomException;
import com.example.demo.service.exception.IpWrongFormException;
import com.example.demo.service.exception.SubstationNotFoundException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Arrays;
import java.util.List;

@Service
public class SubstationService implements SubstationInterface{

    final
    SubstationRepository substationRepository;

    final
    PingService pingService;

    @Autowired
    public SubstationService(SubstationRepository substationRepository, PingService pingService){
        this.substationRepository = substationRepository;
        this.pingService = pingService;
    }


    @Override
    public void saveSubstation(SubstationModel substation) throws CustomException {
        new IpWrongFormException().controlParam(substation.getPingId());
        substationRepository.save(substation);
    }

    @Override
    public List<SubstationModel> allSubstation() {
        return substationRepository.findAll();
    }

    @Override
    public void editSubstation(long id, SubstationModel substation){
        SubstationModel substationToUpdate = substationRepository.findById(id).orElseThrow(()->new SubstationNotFoundException(id));
        substationToUpdate.setName(substation.getName());
        substationToUpdate.setPingId(substation.getPingId());
        substationToUpdate.setDescription(substation.getDescription());
        substationRepository.save(substationToUpdate);
    }

    @Override
    public SubstationModel oneSubstation(long id) {
        return substationRepository.findById(id).orElseThrow(()->new SubstationNotFoundException(id));
    }

    @Override
    public void deleteSubstation(long id) {
        if(!substationRepository.existsById(id)){
            throw new SubstationNotFoundException(id);
        }
        substationRepository.deleteById(id);
    }

    @Override
    public String pingOneSubstation(long id) {
        return pingService.resultPing(substationRepository.findById(id).orElseThrow());
    }

    @Override
    public List<SubstationModel> pingAllSubstation() {
        return pingService.pingAllSubstations();
    }

    @Override
    public String pingOneCrossOC(long id) {
        return pingService.resultPing(substationRepository.findById(id).orElseThrow());
    }


}
