package entities;

import java.util.ArrayList;


public class Especialidades {

    private String id;
    private String descricao;
    private static ArrayList<Especialidades> lista = new ArrayList<>();

    public Especialidades() {
        id = new String();
        descricao = new String();
    }

    public Especialidades(String id, String descricao) {
        this.id = id;
        this.descricao = descricao;
    }

    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public String getDescricao() {
        return descricao;
    }

    public void setDescricao(String descricao) {
        this.descricao = descricao;
    }

    public static void adicionarEspecialidade(Especialidades esp) {
        lista.add(esp);
    }

    public static ArrayList<Especialidades> obterTodas() {
        return lista;
    }

    public static int totalEspecialidades() {
        return lista.size();
    }

    public static void inicializarEspecialidades() {
        lista.clear();
        lista.add(new Especialidades("001", "Cardiologia"));
        lista.add(new Especialidades("002", "Dermatologia"));
        lista.add(new Especialidades("003", "Ortopedia"));
        lista.add(new Especialidades("004", "Oftalmologia"));
        lista.add(new Especialidades("005", "Pediatria"));
    }

}


/*
    Esta classe representa uma especialidade médica, contendo informações sobre seu ID e descrição.
    Ela possui métodos para adicionar especialidades a uma lista, obter todas as especialidades cadastradas, contar o total de especialidades e inicializar a lista com algumas especialidades pré-definidas.
    O método "inicializarEspecialidades" é útil para preencher a lista com especialidades comuns, facilitando a criação de médicos com especialidades já definidas.
    O atributo "id" é um identificador único para cada especialidade, enquanto "descricao" fornece uma descrição legível da especialidade (por exemplo, "Cardiologia", "Dermatologia", etc.).

*/