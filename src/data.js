export const menu = [
    {
      id: 1,
      title: "Accès Employés",
      listItems: [
        {
          id: 1,
          title: "Tableau de Bord",
          url: "/",
          icon: "home.svg",
        },
        {
          id: 2,
          title: "Profil",
          url: "/profil",
          icon: "user.svg",
        }
   
      ],
    },
    {
      id: 2,
      title: "Accès Superieurs et Admins",
      listItems: [

        
        {
          id: 5,
          title: "Congés",
          url: "/solde_conge",
          icon: "conge.svg"
        },
        {
          id: 1,
          title: "Users",
          url: "/users",
          icon: "user.svg",
        },
        {
          id: 3,
          title: "Listes des Employés",
          url: "/liste_employe",
          icon: "order.svg",
        },
        {
          id: 4,
          title: "Stats",
          url: "/stats",
          icon: "stats.svg",
        }
        ,
        
        
      ],
    },
  ];
console.log(menu)
