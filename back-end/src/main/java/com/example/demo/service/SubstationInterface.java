package com.example.demo.service;


import com.example.demo.models.SubstationModel;
import com.example.demo.service.exception.CustomException;
import com.example.demo.service.exception.IpWrongFormException;

import java.util.List;

public interface SubstationInterface {

    void saveSubstation(SubstationModel substation) throws IpWrongFormException, CustomException;
    List<SubstationModel> allSubstation();
    void editSubstation(long id, SubstationModel substation);
    SubstationModel oneSubstation(long id);
    void deleteSubstation(long id);
    String pingOneSubstation(long id);
    List<SubstationModel> pingAllSubstation();
    String pingOneCrossOC(long id);

}
