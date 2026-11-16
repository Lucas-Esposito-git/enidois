
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { inject } from '@angular/core';
import { AssistidoService } from '../services/assistido.service';
import { Assistido } from '../models/assistido';
import { finalize } from 'rxjs';
import { ChangeDetectorRef} from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { OnInit } from '@angular/core';


@Component({
  selector: 'app-tela-cadastro',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './telaCadastro.html'
})
export class TelaCadastro {

    private assistidoService = inject(AssistidoService);
    private readonly cdr = inject(ChangeDetectorRef);
    private route = inject(ActivatedRoute);

    modoEdicao = false;
    idEdicao: number | null = null;

    ngOnInit(): void {
      const id = this.route.snapshot.paramMap.get('id');

      if (id !== null) {
        this.idEdicao = Number(id);
        this.modoEdicao = true;

        this.assistidoService.buscarPorId(this.idEdicao)
          .subscribe({
            next: (dados) => {
              this.assistido = dados;
              this.cdr.markForCheck();
            },
            error: (err) => {
              console.error('Erro ao buscar assistido:', err);
              this.erro = 'Não foi possível carregar o assistido.';
              this.cdr.markForCheck();
            }
          });
      }
    }


        salvando = false;
        mensagem = '';
        erro = '';

     ufs: string[] = [
        'AC', 'AL', 'AP', 'AM', 'BA', 'CE', 'DF',
        'ES', 'GO', 'MA', 'MT', 'MS', 'MG', 'PA',
        'PB', 'PR', 'PE', 'PI', 'RJ', 'RN', 'RS',
        'RO', 'RR', 'SC', 'SP', 'SE', 'TO'
    ];


  assistido = {
    nome: '',
    nomeSocial: '',
    cpf: '',
    email: '',
    telefone: '',
    endereco: '',
    cep: '',
    uf: '',
    sexo: '',
    genero: '',
    rg: '',
    filiacao: ''
  };

  formatarCpf(): void {
    let cpf = this.assistido.cpf.replace(/\D/g, '').slice(0, 11);

    cpf = cpf.replace(/(\d{3})(\d)/, '$1.$2');
    cpf = cpf.replace(/(\d{3})(\d)/, '$1.$2');
    cpf = cpf.replace(/(\d{3})(\d{1,2})$/, '$1-$2');

    this.assistido.cpf = cpf;
  }

  formatarTelefone(): void {
    let telefone = this.assistido.telefone.replace(/\D/g, '').slice(0, 11);

    telefone = telefone.replace(/^(\d{2})(\d)/, '($1) $2');
    telefone = telefone.replace(/(\d{4,5})(\d{4})$/, '$1-$2');

    this.assistido.telefone = telefone;
  }

  formatarCep(): void {
    let cep = this.assistido.cep.replace(/\D/g, '').slice(0, 8);
    cep = cep.replace(/^(\d{5})(\d)/, '$1-$2');
    this.assistido.cep = cep;
  }

  
  salvar(): void {
    if (this.salvando) return;

    if (!this.assistido.nome || !this.assistido.cpf) {
      this.erro = 'Preencha os campos obrigatórios.';
      return;
    }

    this.salvando = true;
    this.mensagem = '';
    this.erro = '';

    const requisicao = this.modoEdicao && this.idEdicao !== null ? this.assistidoService.atualizar(this.idEdicao, this.assistido)
    : this.assistidoService.cadastrar(this.assistido);

    requisicao.pipe(finalize(() => {this.salvando = false; this.cdr.markForCheck();})).subscribe({
        next: () => {
          this.salvando = false;

          if (this.modoEdicao) {
            this.mensagem = 'Cadastro atualizado com sucesso!';
          } else {
            this.mensagem = 'Cadastro realizado com sucesso!';
          }

          this.cdr.markForCheck();

          setTimeout(() => {
            if (this.modoEdicao) {
              window.location.assign('/assistidos');
            } else {
              window.location.reload();
            }
          }, 2000);
        },

        error: (err) => {
          console.error('Erro ao salvar:', err);

          this.erro = this.modoEdicao ? 'Erro ao atualizar assistido.' : 'Erro ao cadastrar assistido.';
          this.salvando = false;
          this.cdr.markForCheck();
        }
      });
  }
}
