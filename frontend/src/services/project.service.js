import React from 'react'

class ProjectService {

    /**
     * Permet de gérer le style d'affichage du status du projet
     */
    handleProjectStatus = (status) => { 
    switch(status) { 
      case 'OPEN' : {
        return (<div className="alert alert-success w-100" role="alert">
            En cours
          </div>
        )
      } 

      case 'ABANDONED' : {
        return (<div className="alert alert-secondary w-100" role="alert">
            Abandonné
          </div>
        )
      }

      case 'CLOSED' : { return (<div className="alert alert-primary w-100" role="alert">
            Cloturé
          </div>
        )
      }

      case 'MAINTENANCE' : { return (<div className="alert alert-warning w-100" role="alert">
            En maintenance
          </div>
        )
      }

      case 'SUSPENDED' : { return (<div className="alert alert-danger w-100" role="alert">
            Suspendu
          </div>
        )
      }

      default: { 
        return (<div className="alert alert-danger" role="alert">
            Status de projet non défini
          </div>
        )
      }
    }
  }
}

export default new ProjectService()