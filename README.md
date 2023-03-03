# get-package-info

This action gets the name and version of a package.json file and outputs it to be used in other actions.

## Motivation

On CI/CI process we need to get the name and version of the package.json file to be used in other actions, like publishing a package to a registry.

## Usage

```yaml
jobs:
  job_id:
    steps:
      - name: Checkout to branch
        uses: actions/checkout@v3

      - name: Get package info
        id: package-info
        uses: luizfelipelaviola/get-package-info@v1
        with:
          path: .

      - name: Build and push
        uses: docker/build-push-action@v3
        with:
          context: .
          file: Dockerfile
          push: true
        tags: server.dev/${{ steps.package-info.outputs.name }}:${{ steps.package-info.outputs.version }}
```

## Inputs

| Property | Is Required | Default | Comment | Example |
|----------|-------------|---------|---------|---------|
| path     |             | .       | the path to the folder containing the package.json file | ./path/to/package/json |

## Outputs

| Property | Comment | Example |
|----------|---------|---------|
| name     | the name of the package.json file | my-package |
| version  | the version of the package.json file | 1.0.0 |

## Notes

Made with ❤ by [Luiz Felipe Laviola](https://www.linkedin.com/in/luizfelipelaviola/)
