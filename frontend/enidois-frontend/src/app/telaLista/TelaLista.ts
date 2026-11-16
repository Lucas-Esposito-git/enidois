import {
  Component,
  OnInit,
  inject,
  ChangeDetectorRef
} from '@angular/core';

import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { finalize } from 'rxjs';

import { AssistidoService } from '../services/assistido.service';
import { Assistido } from '../models/assistido';

@Component({
  selector: 'app-tela-lista',
  standalone: true,
  imports: [FormsModule, RouterLink],
  templateUrl: './TelaLista.html'
})
export class TelaLista implements OnInit {

  private readonly assistidoService = inject(AssistidoService);
  private readonly cdr = inject(ChangeDetectorRef);

  assistidos: Assistido[] = [];
  pesquisa = '';

  carregando = false;
  excluindoId: number | null = null;

  erro = '';
  mensagem = '';

  ngOnInit(): void {
    this.carregarAssistidos();
  }

  // CARREGAR E ATUALIZAR LISTA
  carregarAssistidos(): void {
    if (this.carregando) return;

    this.carregando = true;
    this.erro = '';

    this.assistidoService.listar()
      .pipe(
        finalize(() => {
          this.carregando = false;
          this.cdr.markForCheck();
        })
      )
      .subscribe({
        next: (dados) => {
          this.assistidos = dados;
          this.cdr.markForCheck();
        },

        error: (err) => {
          console.error('Erro ao carregar assistidos:', err);

          this.erro = 'Não foi possível atualizar a lista.';
          this.cdr.markForCheck();
        }
      });
  }

  // PESQUISAR POR NOME OU CPF
  get assistidosFiltrados(): Assistido[] {
    const termo = this.pesquisa.toLowerCase().trim();
    const termoCpf = this.pesquisa.replace(/\D/g, '');

    return this.assistidos.filter(assistido => {
      const nome = assistido.nome?.toLowerCase() ?? '';

      const cpf = (assistido.cpf ?? '')
        .replace(/\D/g, '');

      return nome.includes(termo) ||
        (termoCpf.length > 0 && cpf.includes(termoCpf));
    });
  }

  // FORMATAR CPF
  formatarCpf(cpf: string): string {
    const numeros = (cpf ?? '').replace(/\D/g, '');

    if (numeros.length !== 11) return cpf ?? '';

    return numeros.replace(
      /(\d{3})(\d{3})(\d{3})(\d{2})/,
      '$1.$2.$3-$4'
    );
  }

  // EXCLUIR ASSISTIDO
  excluir(assistido: Assistido): void {
    if (assistido.id == null || this.excluindoId !== null) {
      return;
    }

    const confirmou = window.confirm(
      `Deseja realmente excluir ${assistido.nome}?`
    );

    if (!confirmou) return;

    const id = assistido.id;

    this.excluindoId = id;
    this.erro = '';
    this.mensagem = '';

    this.assistidoService.deletar(id)
      .pipe(
        finalize(() => {
          this.excluindoId = null;
          this.cdr.markForCheck();
        })
      )
      .subscribe({
        next: () => {
          this.assistidos = this.assistidos.filter(
            item => item.id !== id
          );

          this.mensagem = 'Assistido excluído com sucesso!';
          this.cdr.markForCheck();
        },

        error: (err) => {
          console.error('Erro ao excluir:', err);

          this.erro = 'Não foi possível excluir o assistido.';
          this.cdr.markForCheck();
        }
      });
  }
}