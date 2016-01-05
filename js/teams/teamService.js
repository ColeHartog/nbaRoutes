var app = angular.module('nbaRoutes');

app.service('teamService', function ($http, $q) {

    // service code
    this.addNewGame = function(gameObject){
        var url = 'https://api.parse.com/1/classes/' + gameObject.homeTeam;
        if(parseInt(gameObject.homeTeamScore) > parseInt(gameObject.opponentScore)){
            gameObject.won = true;
        }
        else{
            gameObject.won = false;
        }
        
        return $http.post({
            url: url,
            data: {gameObject}
        }).success(function(stuff){console.log('yay')})
    }
    
    this.getTeamData = function(team){
        var deffered = $q.defer();
        
        var url = 'https://api.parse.com/1/classes/' + team;
        
        $http.get(url).then(function(data){
            var results = data.data.results;
            var wins = 0;
            var losses = 0;
            for(var i = 0; i < results.length; i++){
                if(results[i].won == true){
                    wins++;
                }
                else{
                    losses++;
                }
            }
            results.wins = wins;
            results.losses = losses;
            
            deffered.resolve(results);
            console.log(results[0]);
        })
        
        return deffered.promise;
    }
    

});