package com.esposito.enidois.repository;

import com.esposito.enidois.entity.AssistidoEntity;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface AssistidoRepository extends JpaRepository<AssistidoEntity, Long> {
    List<AssistidoEntity> id(long id);
}
