CREATE DATABASE SistemaAgendamento; 

USE SistemaAgendamento;
GO

CREATE TABLE Usuario (
    id_usuario INT IDENTITY(1,1) PRIMARY KEY,
    nome VARCHAR(100) NOT NULL,
    email VARCHAR(100) NOT NULL UNIQUE,
    senha VARCHAR(255) NOT NULL,
    telefone VARCHAR(15),
    cpf VARCHAR(14) NOT NULL UNIQUE,
    tipo CHAR(1) NOT NULL,
    data_criacao DATETIME2 DEFAULT GETDATE()
);
GO 

CREATE TABLE Paciente (
    id_usuario INT PRIMARY KEY,
    sexo CHAR(1),
    data_nasc DATE NOT NULL,
    CONSTRAINT FK_Paciente_Usuario FOREIGN KEY (id_usuario) 
        REFERENCES Usuario (id_usuario) 
        ON DELETE CASCADE
);
GO

CREATE TABLE Profissional (
    id_usuario INT PRIMARY KEY,               
    numero_registro VARCHAR(20) NOT NULL UNIQUE, 
    descricao VARCHAR(255),
    CONSTRAINT FK_Profissional_Usuario FOREIGN KEY (id_usuario) 
        REFERENCES Usuario (id_usuario) 
        ON DELETE CASCADE
);
GO

 CREATE TABLE Especialidade (
    id_especialidade INT IDENTITY(1,1) PRIMARY KEY, 
    descricao VARCHAR(100) NOT NULL UNIQUE         
);
GO

 CREATE TABLE Consulta (
    id_consulta INT IDENTITY(1,1) PRIMARY KEY,
    id_paciente INT NOT NULL,                  
    id_profissional INT NOT NULL,              
    data_hora DATETIME2 NOT NULL,              
    valor_cons DECIMAL(10, 2) NOT NULL,        
    status_cons VARCHAR(20) NOT NULL,          
    observacoes VARCHAR(MAX)                  
);
GO

ALTER TABLE Consulta
ADD CONSTRAINT FK_Consulta_Paciente 
FOREIGN KEY (id_paciente) REFERENCES Paciente(id_usuario);
GO

ALTER TABLE Consulta
ADD CONSTRAINT FK_Consulta_Profissional 
FOREIGN KEY (id_profissional) REFERENCES Profissional(id_usuario);
GO

  CREATE TABLE Agenda (
    id_agenda INT IDENTITY (1,1) PRIMARY KEY,
    id_profissinal INT NOT NULL,
    data DATE NOT NULL,
    hora_inicio TIME NOT NULL,
    hora_fim TIME NOT NULL,
    disponivel BIT NOT NULL DEFAULT 1,

);
GO

ALTER TABLE Agenda 
ADD id_profissional INT NOT NULL;
GO

ALTER TABLE Agenda 
ADD CONSTRAINT FK_Agenda_Profissional 
FOREIGN KEY (id_profissional) REFERENCES Profissional(id_usuario) ON DELETE CASCADE;
GO

CREATE TABLE Pagamento (
    id_pagamento INT IDENTITY(1,1) PRIMARY KEY,
    id_consulta INT NOT NULL UNIQUE,           
    valor DECIMAL(10,2) NOT NULL,
    status VARCHAR(20) NOT NULL,               
    metodo VARCHAR(30) NOT NULL,               
    data_pagamento DATETIME2                  
);
GO

ALTER TABLE Pagamento
ADD CONSTRAINT FK_Pagamento_Consulta 
FOREIGN KEY (id_consulta) REFERENCES Consulta(id_consulta) ON DELETE CASCADE;
GO
