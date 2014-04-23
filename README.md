```                                                                       
    _/     _/                      _/    _/        _/  _/                       
   _/_/   _/    _/_/_/  _/ _/_/ _/_/_/  _/_/_/    _/      _/_/_/      _/_/    
  _/  _/ _/   _/    _/  _/       _/    _/   _/   _/  _/  _/    _/  _/_/_/_/   
 _/   _/_/   _/    _/  _/       _/    _/   _/   _/  _/  _/    _/  _/          
_/     _/    _/_/_/   _/       _/    _/   _/   _/  _/  _/    _/    _/_/_/     
```
                                                                    
Northline is a JavaScript library that creates SVG maps of Canada's provinces and territories from GeoJSON.
It's a small modification on the U.S. version, Landline, by ProPublica.
It comes with Stateline, also by ProPublica, which makes creating responsive U.S. state and county maps easy.

### Forked from Landline and Stateline by ProPublica
Documentation for Landline: http://propublica.github.io/landline/
Issues or questions about Landline and Stateline: https://github.com/propublica/landline/issues

### Alterations from Landline
Northline uses the same basic structure with some alterations.
* You can simply swap in your data as a JSON array called `mapData`. Be sure to specify the province or territory.
Issues or questions about Northline: @stuartathompson
* Tooltips are styled as white-on-black, semi-transparent boxes

### To come
This is the initial commit of a working version. Bugs could exist. Many alterations to come.