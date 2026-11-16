package com.esposito.enidois.dto;

import lombok.Getter;
import lombok.Setter;
import lombok.NoArgsConstructor;
import lombok.AllArgsConstructor;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class AssistidoDTO {

    private String nome;
    private String nomeSocial;
    private String cpf;
    private String email;
    private String telefone;
    private String endereco;
    private String cep;
    private String uf;
    private String sexo;
    private String genero;
    private String rg;
    private String filiacao;
}
