package entities;

public class PessoaEntity {

    private String cpf;
    private String nome;
    private String senha;
    private String email;
    private String telefone;

    public PessoaEntity() {
        cpf = new String();
        nome = new String();
        senha = new String();
        email = new String();
        telefone = new String();
    }

    public PessoaEntity(String cpf, String nome, String senha, String email, String telefone) {
        this.cpf = cpf;
        this.nome = nome;
        this.senha = senha;
        this.email = email;
        this.telefone = telefone;

    }

    public String getCpf() {
        return cpf;
    }

    public void setCpf(String cpf) {
        this.cpf = cpf;
    }

    public String getNome() {
        return nome;
    }

    public void setNome(String nome) {
        this.nome = nome;
    }

    public String getSenha() {
        return senha;
    }

    public void setSenha(String senha) {
        this.senha = senha;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getTelefone() {
        return telefone;
    }

    public void setTelefone(String telefone) {
        this.telefone = telefone;

    }

    public String mostrarStatus() // Método para mostrar o status da pessoa (pode ser sobrescrito pelas classes filhas)
    {
        return "Pessoa: " + nome
                + " - Status: ";
    }

}

    
/*
    Esta classe representa uma pessoa genérica, contendo atributos comuns como CPF, nome, senha, email e telefone.
    Ela possui métodos para acessar e modificar essas informações, permitindo a criação de objetos do tipo PessoaEntity com detalhes completos sobre a pessoa.
    O método "mostrarStatus" é um método genérico que pode ser sobrescrito por classes filhas (como MedicoEntity e PacienteEntity) para exibir informações específicas de cada tipo de pessoa.
    A classe pode ser utilizada como base para criar e gerenciar diferentes tipos de pessoas em um sistema de saúde, associando-as a consultas, agendas e outros elementos do sistema, e exibindo suas informações de forma organizada. 
*/


