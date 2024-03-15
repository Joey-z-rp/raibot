Cloned from https://github.com/isl-org/MiDaS

### Setup notes
After running `conda env create -f environment.yaml` and `conda activate midas-py310`
with the modified `environment.yaml` file, it's still missing some dependencies.
For torch, use `pip install torchvision` (torch-2.2.1 and torchvision-0.17.1 installed).
For cv2, use `pip install opencv-python`.
For imutils, use `pip install imutils==0.5.4`.
For timm, use `pip install timm==0.6.12`.

### Citation
```
@ARTICLE {Ranftl2022,
    author  = "Ren\'{e} Ranftl and Katrin Lasinger and David Hafner and Konrad Schindler and Vladlen Koltun",
    title   = "Towards Robust Monocular Depth Estimation: Mixing Datasets for Zero-Shot Cross-Dataset Transfer",
    journal = "IEEE Transactions on Pattern Analysis and Machine Intelligence",
    year    = "2022",
    volume  = "44",
    number  = "3"
}
```

```
@article{birkl2023midas,
      title={MiDaS v3.1 -- A Model Zoo for Robust Monocular Relative Depth Estimation},
      author={Reiner Birkl and Diana Wofk and Matthias M{\"u}ller},
      journal={arXiv preprint arXiv:2307.14460},
      year={2023}
}
```