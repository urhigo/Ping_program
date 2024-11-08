package com.example.demo.service;

import org.springframework.stereotype.Service;

import java.net.*;
import java.util.Enumeration;

@Service
public class ControlIpDevice {

    public String ipAddressDevice(){
        String interfacesPC = "";
        try {
            Enumeration<NetworkInterface> interfaces = NetworkInterface.getNetworkInterfaces();
            while (interfaces.hasMoreElements()) {
                NetworkInterface networkInterface = interfaces.nextElement();
                if (networkInterface.isUp()) {
                    Enumeration<InetAddress> addresses = networkInterface.getInetAddresses();
                    while (addresses.hasMoreElements()) {
                        InetAddress inetAddress = addresses.nextElement();
                        if (!inetAddress.isLoopbackAddress() && inetAddress instanceof Inet4Address) {
                            interfacesPC += networkInterface.getDisplayName() + "\n";
                            interfacesPC += "IP:\t" + inetAddress.getHostAddress() + "\n";
                            System.out.println("Interface: " + networkInterface.getDisplayName());
                            System.out.println("IP Address: " + inetAddress.getHostAddress());
                        }
                    }
                }
            }
            return interfacesPC;
        } catch (SocketException e) {
            e.printStackTrace();
            return "Exception";
        }

    }
}

