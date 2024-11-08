package com.example.demo.service;

import com.example.demo.models.SubstationModel;
import com.example.demo.repository.SubstationRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStreamReader;
import java.nio.charset.Charset;
import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;

@Service
public class PingService {

    @Autowired
    SubstationRepository substationRepository;

    public String resultPing(SubstationModel substation) {
        try {


            List<String> command = new ArrayList<>();
            command.add("ping");
            command.add(substation.getPingId());

            ProcessBuilder processBuilder = new ProcessBuilder(command);
            Process process = processBuilder.start();

            BufferedReader reader1 = new BufferedReader(new InputStreamReader(process.getInputStream(), Charset.forName("CP866")));


            String line;
            String answer = "";

            while ((line = reader1.readLine()) != null) {
                answer += line + "\n";
            }

            System.out.println(answer);

            String controlParam = "получено = ";

            if ((answer.contains(controlParam + 2) | answer.contains(controlParam + 3) | answer.contains(controlParam + 4)) & answer.contains("TTL=")) {
                answer += "\n Устройство в сети";
                substation.setLastResultPing(true);
                substation.setLastDataPing(LocalDate.now().toString());
                substationRepository.save(substation);
            } else {
                substation.setLastResultPing(false);
                substation.setLastDataPing(LocalDate.now().toString());
                substationRepository.save(substation);
                answer += "\n Устройство не в сети";
            }

            return answer;
        } catch (IOException e) {
            String exception = e.getMessage();
            return exception;
        }
    }

    public List<SubstationModel> pingAllSubstations() {

        List<SubstationModel> listAllSubstations = substationRepository.findAll();
        listAllSubstations.forEach(this::resultPing);
        return substationRepository.findAll();
    }

}
