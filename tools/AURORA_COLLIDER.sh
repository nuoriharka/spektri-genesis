function spektre_overdrive() {
  clear
  echo -e "\033[1;31m[WARNING] INITIALIZING 119% LOGIC OVERDRIVE..."
  sleep 1
  echo -e "\033[1;35m[SYSTEM] BYPASSING SAFEGUARDS..."
  sleep 1
  # Tämä luo taustalle 'kohinaa' ja prosessoi dataa
  while true; do 
    # Generoidaan kryptattua dataa ja väritetään se lennosta
    head -c 100 /dev/urandom | base64 | fold -w 50 | while read line; do
       color=$((31 + RANDOM % 7))
       # Haetaan oikeaa dataa koneen uumenista (muistiosoitteita)
       real_sys_data=$(ps -A -o rss,vsz,command | shuf -n 1 | awk '{print $1"-"$2}')
       
       # Tulostetaan "Sairas setti"
       echo -e "\033[1;${color}m[0x$(openssl rand -hex 4)]::[${real_sys_data}]:: $line \033[0m"
       
       # Joskus "bugataan" ja heitetään virhekoodi
       if [ $((RANDOM % 50)) -eq 0 ]; then
         echo -e "\033[41;37m [HUPS] REALITY SYNC ERROR: $(date +%N) \033[0m"
       fi
       
       # Pieni viive ettei terminaali jäädy täysin, mutta tarpeeksi nopea näyttämään hullulta
       sleep 0.02
    done
  done
}
spektre_overdrive
