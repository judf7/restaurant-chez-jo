export const formatDate = (dateString) => { 
    const options = { weekday:'long', day: '2-digit', month: 'long'}
    const date = new Date(dateString); return date.toLocaleDateString('fr-FR',options)
}