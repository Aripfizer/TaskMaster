const formatCurrentDate = (
  date: Date,
  includeTime: boolean = false
): string => {
  const dateOptions: Intl.DateTimeFormatOptions = {
    weekday: "long", // Nom complet du jour (e.g. 'Mercredi')
    day: "2-digit", // Jour sur deux chiffres (e.g. '02')
    month: "2-digit", // Mois sur deux chiffres (e.g. '10')
    year: "numeric", // Année complète (e.g. '2024')
  };

  let formattedDate = new Intl.DateTimeFormat("fr-FR", dateOptions).format(
    date
  );

  // Mettre la première lettre du jour en majuscule
  formattedDate =
    formattedDate.charAt(0).toUpperCase() + formattedDate.slice(1);

  if (includeTime) {
    const timeOptions: Intl.DateTimeFormatOptions = {
      hour: "2-digit", // Heure sur deux chiffres
      minute: "2-digit", // Minutes sur deux chiffres
    };
    const formattedTime = new Intl.DateTimeFormat("fr-FR", timeOptions).format(
      date
    );
    return `${formattedDate} à ${formattedTime}`;
  }

  return formattedDate;
};

export default formatCurrentDate;
