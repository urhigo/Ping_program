package com.example.demo.controller;

import com.example.demo.models.SubstationModel;

import com.example.demo.service.ControlIpDevice;
import com.example.demo.service.SubstationService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.net.SocketException;
import java.net.UnknownHostException;
import java.util.List;

@RestController
@RequestMapping("/ping")
@CrossOrigin("http://localhost:3000")
public class Ping {

    @Autowired
    SubstationService substationService;

    @Autowired
    ControlIpDevice controlIpDeviceService;

    @GetMapping("/{id}")
    public String pingSubstation(@PathVariable long id){
        return substationService.pingOneSubstation(id);
    }

    @GetMapping("/all_substations")
    public List<SubstationModel> pingAllSubstation(){
        return substationService.pingAllSubstation();
    }

    @GetMapping("/cross/{id}")
    public String pingCrossOC(@PathVariable long id){
        return substationService.pingOneCrossOC(id);
    }

    @GetMapping("/ipDevice")
    public String idAddressDevise() throws SocketException, UnknownHostException {
        return controlIpDeviceService.ipAddressDevice();
    }
}
