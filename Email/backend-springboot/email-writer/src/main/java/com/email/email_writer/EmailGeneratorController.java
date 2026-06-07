package com.email.email_writer;

import lombok.AllArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import static org.springframework.http.ResponseEntity.ok;

@RestController
@RequestMapping("/api/email")
@CrossOrigin(origins = "*")
@AllArgsConstructor
public class EmailGeneratorController {

    private final EmailGeneratorService emailGeneratorService;


    @PostMapping("/generate")
    public ResponseEntity<String> emailGenerator(@RequestBody  EmailRequest emailRequest){
        String response = emailGeneratorService.generateEmail(emailRequest);
        return ResponseEntity.ok(response);
    }
}
