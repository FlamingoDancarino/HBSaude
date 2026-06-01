package entities;

import java.time.LocalDate;
import java.util.ArrayList;

public class Consulta {

    private LocalDate data_hora;
    private String status;
    private static ArrayList<Consulta> lista = new ArrayList<>();

    public Consulta() {
        data_hora = LocalDate.now();
        status = new String();
    }

    public Consulta(LocalDate data_hora, String status) {
        this.data_hora = data_hora;
        this.status = status;
    }

    public LocalDate getData_hora() {
        return data_hora;
    }

    public void setData_hora(LocalDate data_hora) {
        this.data_hora = data_hora;
    }

    public String getStatus() {
        return status;
    }

    public void setStatus(String status) {
        this.status = status;
    }

    public static void adicionarConsulta(Consulta consulta) {
        lista.add(consulta);
    }

    public static ArrayList<Consulta> obterTodas() {
        return lista;
    }

    public static int totalConsultas() {
        return lista.size();
    }

    public static void inicializarConsultas(LocalDate data1, LocalDate data2, LocalDate data3) {
        lista.clear();
        lista.add(new Consulta(data1, "Confirmada"));
        lista.add(new Consulta(data2, "Pendente"));
        lista.add(new Consulta(data3, "Cancelada"));
    }

}


/*
    Esta classe representa uma consulta médica, contendo informações sobre a data e hora da consulta, bem como seu status (confirmada, pendente, cancelada, etc.).
    Ela possui métodos para adicionar consultas a uma lista estática, obter todas as consultas cadastradas, contar o total de consultas e inicializar a lista com algumas consultas pré-definidas.
    O método "inicializarConsultas" é útil para criar um conjunto inicial de consultas com datas específicas e status variados, facilitando o teste e demonstração do sistema.
    A classe pode ser utilizada para gerenciar as consultas agendadas, permitindo que sejam adicionadas, listadas e organizadas conforme necessário.


*/
