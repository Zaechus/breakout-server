{
  inputs = {
    nixpkgs.url = "github:nixos/nixpkgs/nixos-unstable";
    rust-overlay.url = "github:oxalica/rust-overlay";
  };

  outputs = { nixpkgs, rust-overlay, ... }:
    let system = "x86_64-linux"; in {
      devShell.${system} = let
        pkgs = import nixpkgs {
          inherit system;
          overlays = [ rust-overlay.overlays.default ];
        };
      in ({ pkgs, ... }: pkgs.mkShell {
        buildInputs = with pkgs; [
          cargo
          (rust-bin.stable.latest.default.override {
            targets = [ "wasm32-unknown-unknown" ];
          })
          wasm-bindgen-cli
        ];

        shellHook = ''
          cd breakout-wasm
          cargo b -r --target wasm32-unknown-unknown
          wasm-bindgen --target web target/wasm32-unknown-unknown/release/breakout_wasm.wasm --out-dir pkg
          cp pkg/*.js ../docs
          cp pkg/*.wasm ../docs
          cd ..
          cargo b -r
          exit
        '';
      }) { inherit pkgs; };
    };
}