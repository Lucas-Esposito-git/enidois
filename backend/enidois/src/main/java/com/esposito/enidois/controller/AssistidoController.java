package com.esposito.enidois.controller;

import com.esposito.enidois.dto.AssistidoDTO;
import com.esposito.enidois.entity.AssistidoEntity;
import com.esposito.enidois.repository.AssistidoRepository;
import com.esposito.enidois.service.AssistidoService;
import lombok.AllArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/assistidos")
@CrossOrigin(origins = "http://localhost:4200")
@AllArgsConstructor
public class AssistidoController {

    private final AssistidoService service;

    @PostMapping
    public AssistidoEntity cadastrar(@RequestBody AssistidoDTO dto) {
        return service.salvar(dto);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deletar(@PathVariable Long id) {
        service.deletar(id);
        return ResponseEntity.noContent().build();
    }

    @GetMapping
    public List<AssistidoEntity> listarTodos() {
        return service.listar();
    }

    @GetMapping("/{id}")
    public AssistidoEntity buscarPorId(@PathVariable Long id) {
        return service.buscarPorId(id);
    }

    @PutMapping("/{id}")
    public AssistidoEntity atualizar(@PathVariable Long id ,@RequestBody AssistidoDTO dto) {
        return service.atualizar(id, dto);
    }
}
