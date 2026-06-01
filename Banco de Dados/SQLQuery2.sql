USE SistemaAgendamento;
GO


ALTER TABLE Profissional
ADD id_especialidade INT;
GO


ALTER TABLE Profissional
ADD CONSTRAINT FK_Profissional_Especialidade 
FOREIGN KEY (id_especialidade) REFERENCES Especialidade(id_especialidade);
GO


UPDATE Profissional
SET id_especialidade = 1
WHERE id_usuario = 1;
GO


SELECT 
    C.id_consulta AS [Código da Consulta],
    U_Pac.nome AS [Nome do Paciente],
    U_Med.nome AS [Médico],
    E.descricao AS [Especialidade],
    FORMAT(C.data_hora, 'dd/MM/yyyy HH:mm') AS [Data/Hora],
    C.valor_cons AS [Valor da Consulta],
    P.status AS [Status do Pagamento],
    P.metodo AS [Forma de Pagamento]
FROM Consulta C
INNER JOIN Usuario U_Pac ON C.id_paciente = U_Pac.id_usuario
INNER JOIN Usuario U_Med ON C.id_profissional = U_Med.id_usuario
INNER JOIN Profissional Prof ON U_Med.id_usuario = Prof.id_usuario
INNER JOIN Especialidade E ON Prof.id_especialidade = E.id_especialidade
LEFT JOIN Pagamento P ON C.id_consulta = P.id_consulta;
GO