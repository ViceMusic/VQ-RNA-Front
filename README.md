# What is VQ-RNA?

VQ-RNA is a user-friendly interpretable deep-learning platform for RNA sequence modification analysis, such as RNA modification sites prediction and motif recognition based on In silico saturation mutagenesis (ISM). VQ-RNA supports site prediction for ten common RNA modifications (Am, Cm, Gm, Um, m1A, m5C, m5U, m6A, m6Am, Ψ) and offers interpretability analyses. We support modification site prediction for RNA sequences longer than 51 bp. To achieve this, we employ a sliding window approach, starting predictions from the 25th position onward. Due to the constraints of the model architecture and the need to ensure result reliability, predictions cannot be made for the first and last 25 positions, and only the intermediate region is presented. We identify key bases or regions with higher importance in the model by simulating mutations, aligning them with biologically relevant motifs, and visualizing the results.


Our platform is continuously evolving,and we plan to introduce a file upload feature that allows batch processing of
multiple sequences for prediction and motif identification.
This enhancement is expected to improve motif recognition accuracy, as it has been shown
to be more reliable when based on multiple sequences. Additionally,
we will also incorporate a TF-IDF-based RNA modification specificity analysis,
providing a clear and quantitative visualization of the distinctions among different RNA modification types.