{ pkgs, ... }: {
  channel = "stable-23.11";

  packages = [
    pkgs.nodejs_20
    pkgs.openssl.dev
  ];

  env = { };

  idx = {
    extensions = [
      "google.gemini-cli-vscode-ide-companion"
    ];

    workspace = {
      onCreate = {
        npm-install = "npm ci --no-audit --prefer-offline --no-progress";
      };

      onStart = {
        run-server = "npm run dev";
      };
    };
  };
}
