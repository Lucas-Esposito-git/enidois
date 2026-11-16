package com.esposito.enidois.service;

import com.esposito.enidois.dto.AssistidoDTO;
import com.esposito.enidois.entity.AssistidoEntity;
import com.esposito.enidois.repository.AssistidoRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class AssistidoService {

    private final AssistidoRepository repository;

    public AssistidoService(AssistidoRepository repository) {
        this.repository = repository;
    }

    public AssistidoEntity salvar(AssistidoDTO dto) {

        AssistidoEntity assistido = new AssistidoEntity();

        assistido.setNome(dto.getNome());
        assistido.setCpf(dto.getCpf());
        assistido.setEmail(dto.getEmail());
        assistido.setTelefone(dto.getTelefone());
        assistido.setNomeSocial(dto.getNomeSocial());
        assistido.setRg(dto.getRg());
        assistido.setUf(dto.getUf());
        assistido.setGenero(dto.getGenero());
        assistido.setSexo(dto.getFiliacao());
        assistido.setCep(dto.getCep());
        assistido.setFiliacao(dto.getFiliacao());
        assistido.setEndereco(dto.getEndereco());

        return repository.save(assistido);
    }

    public AssistidoEntity atualizar(Long id, AssistidoDTO dto) {

        AssistidoEntity assistido = repository.findById(id).orElseThrow(() -> new RuntimeException("Assistido não encontrado"));

        assistido.setNome(dto.getNome());
        assistido.setCpf(dto.getCpf());
        assistido.setEmail(dto.getEmail());
        assistido.setTelefone(dto.getTelefone());
        assistido.setNomeSocial(dto.getNomeSocial());
        assistido.setRg(dto.getRg());
        assistido.setUf(dto.getUf());
        assistido.setGenero(dto.getGenero());
        assistido.setSexo(dto.getFiliacao());
        assistido.setCep(dto.getCep());
        assistido.setFiliacao(dto.getFiliacao());
        assistido.setEndereco(dto.getEndereco());

        return repository.save(assistido);
    }

    public void deletar(Long id) {

        AssistidoEntity assistido = repository.findById(id).orElseThrow(() -> new RuntimeException("Assistido não encontrado"));

        repository.delete(assistido);
    }

    public List<AssistidoEntity> listar() {

        return repository.findAll();

    }
}
