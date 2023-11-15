
Seleccionar un curso y mostrar la información de este (nombre, número de estudiantes 
inscritos, profesor que dicta el curso, cantidad de créditos, entre otro)

SELECT
    c.Nombre AS NombreCurso,
    COUNT(DISTINCT i.IDEstudiante) AS NumeroEstudiantesInscritos,
    CONCAT(p.Nombre, ' ', p.Apellido) AS NombreCompletoProfesor,
    c.Creditos
FROM
    clase c
JOIN
    inscripciones i ON c.ID = i.IDClase
JOIN
    profesor p ON c.Nombre = p.Nombrecurso
WHERE
    c.Nombre = 'Introduccion Ingenieria';

Seleccionar un Alumno y mostrar la información de este (nombre, número de créditos 
inscritos, semestre que cursa, entre otros datos que considere relevantes)

SELECT
    e.Nombre AS NombreEstudiante,
    e.Apellido AS ApellidoEstudiante,
    e.Creditos AS CreditosInscritos,
    e.Semestre AS SemestreActual,
    e.Facultad AS Facultad,
    GROUP_CONCAT(DISTINCT c.Nombre SEPARATOR ', ') AS CursosInscritos
FROM
    estudiante e
JOIN inscripciones i ON e.ID = i.IDEstudiante
JOIN clase c ON i.IDClase = c.ID
WHERE
    CONCAT(e.Nombre, ' ', e.Apellido) = 'Moises Karen';