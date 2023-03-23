export interface IConfigExam {
    id?: number
    subtemas?: string[]
    filtro_preguntas?: string[]
    idioma?: string
    numero_preguntas?: number
    simular_enarm?: boolean
    modo_examen?: string
}
export interface ISubtemas {
    response:[]
}