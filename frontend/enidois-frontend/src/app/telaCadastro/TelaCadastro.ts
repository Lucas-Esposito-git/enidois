
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { inject } from '@angular/core';
import { AssistidoService } from '../services/assistido.service';
import { Assistido } from '../models/assistido';

@Component({
  selector: 'app-tela-cadastro',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './telaCadastro.html'
})
export class TelaCadastro {

    private assistidoService = inject(AssistidoService);

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

  
    cadastrar(): void {

        if (this.salvando) return;

        this.mensagem = '';
        this.erro = '';

        const dados: Assistido = {
            ...this.assistido,

            cpf: this.assistido.cpf.replace(/\D/g, ''),
            telefone: this.assistido.telefone.replace(/\D/g, ''),
            cep: this.assistido.cep.replace(/\D/g, '')
        };

        if (dados.cpf.length !== 11) {
            this.erro = 'O CPF deve conter 11 dígitos.';
            return;
        }

        this.salvando = true;

        this.assistidoService.cadastrar(dados).subscribe({

            next: (resposta) => {
            console.log('Assistido cadastrado:', resposta);

            this.mensagem = 'Assistido cadastrado com sucesso!';
            this.salvando = false;

            this.assistido = {
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
            },

            error: (erro) => {
            console.error('Erro ao cadastrar:', erro);

            this.erro =
                'Não foi possível cadastrar o assistido. Código HTTP: ' +
                (erro.status || 'desconhecido');

            this.salvando = false;
            }
        });
    }

}