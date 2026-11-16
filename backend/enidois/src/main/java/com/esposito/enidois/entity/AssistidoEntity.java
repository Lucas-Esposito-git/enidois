package com.esposito.enidois.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.hibernate.type.descriptor.jdbc.NVarcharJdbcType;

@Entity
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class AssistidoEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long id;

    @Column(name = "nome", nullable = false)
    private String nome;

    @Column(name = "nomeSocial", length = 200)
    private String nomeSocial;

    @Column(name = "cpf", nullable = false, unique = true)
    private String cpf;

    @Column(name = "email", length = 100)
    private String email;

    @Column(name = "telefone")
    private String telefone;

    @Column(name = "endereco", length = 200)
    private String endereco;

    @Column(name = "cep")
    private String cep;

    @Column(name = "genero", length = 100)
    private String genero;

    @Column(name = "sexo")
    private String sexo;

    @Column(name = "uf", length = 2)
    private String uf;

    @Column(name = "filiacao", length = 100)
    private String filiacao;

    @Column(name = "rg")
    private String rg;
}
