package entities;

import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;

public class Pagamento {  

    private static final DateTimeFormatter FORMATTER = DateTimeFormatter.ofPattern("dd/MM/yyyy HH:mm:ss");

    private double valor;
    private LocalDateTime data_pagamento;
    private boolean status;
    private String formaPagamento;
    private AgendaEntity atendimento;

    public Pagamento() {
        valor = 0.0;
        data_pagamento = LocalDateTime.now();
        status = false;
        formaPagamento = new String();
        atendimento = new AgendaEntity();
    }

    public Pagamento(double valor, LocalDateTime data_pagamento, boolean status, String formaPagamento, AgendaEntity atendimento) {
        this.valor = valor;
        this.data_pagamento = data_pagamento;
        this.status = status;
        this.formaPagamento = formaPagamento;
        this.atendimento = atendimento;
    }

    public double getValor() {
        return valor;
    }

    public void setValor(double valor) {
        this.valor = valor;
    }

    public LocalDateTime getData_pagamento() {
        return data_pagamento;
    }

    public String getDataPagamentoFormatada() {
        return data_pagamento.format(FORMATTER);
    }

    public void setData_pagamento(LocalDateTime data_pagamento) {
        this.data_pagamento = data_pagamento;
    }

    public boolean isStatus() {
        return status;
    }

    public void setStatus(boolean status) {
        this.status = status;
    }

    public String getFormaPagamento() {
        return formaPagamento;
    }

    public void setFormaPagamento(String formaPagamento) {
        this.formaPagamento = formaPagamento;
    }

    public AgendaEntity getAtendimento() {
        return atendimento;
    }

    public void setAtendimento(AgendaEntity atendimento) {
        this.atendimento = atendimento;
    }

    @Override
    public String toString() {
        return "Pagamento{" + "valor=" + valor + ", data_pagamento=" + getDataPagamentoFormatada() + ", status=" + status + ", formaPagamento=" + formaPagamento + ", atendimento=" + atendimento + '}';
    }

}

    
/*
    Esta classe representa um pagamento realizado para um atendimento médico, contendo informações sobre o valor, data do pagamento, status, forma de pagamento e o atendimento associado.
    Ela possui métodos para acessar e modificar essas informações, permitindo a criação de objetos do tipo Pagamento com detalhes completos sobre o pagamento, facilitando a gestão financeira em um sistema de saúde.
    O método "getDataPagamentoFormatada" formata a data do pagamento em um formato legível, enquanto o método "toString" fornece uma representação textual completa do pagamento, incluindo detalhes do atendimento associado.
    A classe pode ser utilizada para criar e gerenciar pagamentos em um sistema de saúde, associando-os a atendimentos específicos, exibindo suas informações de forma organizada e facilitando o controle financeiro do sistema.
*/