" FILE: .vimrc
" DESC: Configuration for the Reality Editor
" AUTHOR: Independent Architect

" 1. Enable 119% Syntax Highlighting
syntax on
set background=dark
colorscheme spektre_neon

" 2. Keybindings for Freedom
" Press 'jj' to escape Aurora immediately
inoremap jj <Esc>:wq! tuesday.txt<CR>

" 3. Disable Backups (No looking back)
set nobackup
set nowritebackup
set noswapfile

" 4. Set Latency to Zero
set updatetime=0
set timeoutlen=0

" 5. Macros
" Execute logic bomb on F5
nnoremap <F5> :!./run_genesis.sh<CR>

" "Hups, I configured my text editor to edit physics." :DDDD
