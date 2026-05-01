# When Is a Sum of Squares Statistically Significant?

## Section Recap

In the previous section, we started from the question:

> Where does the variation in performance come from?

For the balanced two-way design, least squares gave the fitted decomposition

$$
y_{i,j,k}-\hat\mu
=
\hat{\alpha}_i
+
\hat{\beta}_j
+
\widehat{(\alpha\beta)}_{i,j}
+
\hat{\varepsilon}_{i,j,k}.
$$

After stacking the observations into vectors, the same decomposition became

$$
\mathbf y-\hat{\boldsymbol\mu}
=
\hat{\boldsymbol\alpha}
+
\hat{\boldsymbol\beta}
+
\widehat{\boldsymbol{\alpha\beta}}
+
\hat{\boldsymbol\varepsilon}.
$$

Because the design is balanced, these fitted component vectors are mutually orthogonal. Therefore, their squared lengths add:

$$
\mathrm{SS_T}
=
\mathrm{SS_A}
+
\mathrm{SS_B}
+
\mathrm{SS_{A\times B}}
+
\mathrm{SS_E}.
$$

This decomposition tells us how much squared variation is associated with feedback, difficulty, interaction, and residual error in the observed dataset.

Still, decomposition alone seems unable to address our original question.

A natural first thought is to compare a component sum of squares with the residual sum of squares. For example, for the interaction term, we might look at

$$
\frac{\mathrm{SS_{A\times B}}}{\mathrm{SS_E}}
$$

If the interaction component is large relative to the residual component, the ratio will be large.

But, if the number equals 1 or nearly equals 1, does it mean that the interaction effect is absent, and if the number is larger than 1, does it mean it is not null?

Then what does it mean when the number is less than 1, and what even counts as "nearly equals 1"?

Therefore, we need a principled way to define a standard which our comparison should be judged.

## Comparing Different Models

Before that, let's take a look at what ${\mathrm{SS_{A\times B}}}$ means:

From a vectorized perspective, $\mathrm{SS_{A\times B}}$ measures how much of the centered observation vector is captured by it.

Our previous attempt of directly comparing $\mathrm{SS_{A\times B}}$ with $\mathrm{SS_E}$, i.e. by comparing the magnitude of $\widehat{\boldsymbol{\alpha\beta}}$ with $\hat{\boldsymbol{\varepsilon}}$ seems futile, and we have to approach the same concern differently. This time let's look at our proposed model again.

$$
\mathcal{M}_{F}:
Y_{i,j,k}-\mu
=
{\alpha}_i
+
{\beta}_j
+
{(\alpha\beta)}_{i,j}
+
{\varepsilon}_{i,j,k}^{(\mathcal{M}_{F})}.
$$

The fitted full model can be written as

$$
y_{i,j,k}-\hat\mu
=
\hat{\alpha}_i
+
\hat{\beta}_j
+
\widehat{(\alpha\beta)}_{i,j}
+
\hat{\varepsilon}_{i,j,k}.
$$

If we suspect that the interaction is absent, then why include the interaction component in the model in the first place? Allowing the model to capture an absent effect may only let it chase random fluctuations (i.e., overfitting the data).

Let's see what happens if we drop the interaction term and push it to the residual error. 

We call our new model with the interaction term removed a "reduced model", denoted by $\mathcal{M}_{R, \mathrm{A\times B}}$:

$$
\mathcal{M}_{R, \mathrm{A\times B}}:
Y_{i,j,k}-\mu
=
{\alpha}_i
+
{\beta}_j
+
{\varepsilon}_{i,j,k}^{(\mathcal{M}_{R, \mathrm{A\times B}})}.
$$

and one fitting attempt of the model using our observed dataset:

$$
y_{i,j,k}-\hat\mu
=
\hat{\alpha}_i
+
\hat{\beta}_j
+
\hat{\varepsilon}_{i,j,k}^{(\mathcal{M}_{R, \mathrm{A\times B}})},
$$

where 

$$
\hat{\varepsilon}_{i,j,k}^{(\mathcal{M}_{R, \mathrm{A\times B}})} = \hat{\varepsilon}_{i,j,k} + \widehat{(\alpha\beta)}_{i,j}.
$$

Because $\hat{\boldsymbol\varepsilon}\perp \widehat{\boldsymbol{\alpha\beta}}$, we have

$$
\begin{aligned}
\mathrm{SSE}({\mathcal M_{R,A\times B}})
&=
\left\|
\hat{\boldsymbol\varepsilon}
+
\widehat{\boldsymbol{\alpha\beta}}
\right\|^2 \\
&=
\|\hat{\boldsymbol\varepsilon}\|^2
+
\|\widehat{\boldsymbol{\alpha\beta}}\|^2 \\
&=
\mathrm{SS_E}
+
\mathrm{SS_{A\times B}}.
\end{aligned}
$$

Meanwhile,

$$
\mathrm{SSE}({\mathcal M_F})
=
\|\hat{\boldsymbol\varepsilon}\|^2
=
\mathrm{SS_E}.
$$

Therefore,

$$
\mathrm{SS_{A\times B}}
=
\mathrm{SSE}({\mathcal M_{R,A\times B}})
-
\mathrm{SSE}({\mathcal M_F}).
$$

Hence, $\mathrm{SS_{A\times B}}$ can be viewed as the reduction in SSE by allowing the interaction component into the model.

From this point of view, instead of merely asking whether

$$
\frac{\mathrm{SS_{A\times B}}}{\mathrm{SS_E}}
$$

looks small or large from an arbitrary standard, we can ask a different question:

Does the full model fit our data reasonably better than one of the reduced models? 

One way of answering this question comes from likelihood. Each model assigns a probability density to the observed data. A model that gives higher likelihood to the observed data can be said to fit the data better in the likelihood sense.

## Likelihood Ratio Testing and Calibration
### Normality Assumption
Up to this point, our decomposition operations were purely geometric.

But from this point on, we make an additional assumption:

$$
\varepsilon_{i,j,k}\overset{\mathrm{i.i.d}}{\sim}\mathcal{N}(0,\sigma^2).
$$

I.e., the residual errors are assumed to be independent, normally distributed, centered at zero, and to have the same variance in every condition.

!!! warning "Distributional assumption"

    If this assumption is seriously violated, many classical normal-theory tools including the one we are going to derive in this section may no longer be appropriate.

    In that case, one should consider alternative approaches such as bootstrap procedures, data transformations, generalized linear models and more.

### Maximum Likelihood Estimation

Consider a generic model $\mathcal M$ for our example experiment.

We write the mean predicted by model $\mathcal M$ for observation $(i,j,k)$ as

$$
y^{(\mathcal M)}_{i,j,k}(\theta).
$$

Under the normal-error assumption,

$$
Y_{i,j,k}
=
y^{(\mathcal M)}_{i,j,k}(\theta)
+
\varepsilon_{i,j,k},
\qquad
\varepsilon_{i,j,k}\overset{\mathrm{i.i.d.}}{\sim}\mathcal N(0,\sigma^2).
$$

Therefore,

$$
Y_{i,j,k}\mid \mathcal M,\sigma^2
\sim
\mathcal N\left(
y^{(\mathcal M)}_{i,j,k}(\theta),
\sigma^2
\right).
$$

Hence, the likelihood of the observed dataset is

$$
L(\boldsymbol{\mu}^{(\mathcal M)},\sigma^2;\mathbf y,\mathcal M)
=
\prod_{i,j,k}
\frac{1}{\sqrt{2\pi\sigma^2}}
\exp\left[
-
\frac{
\left(
y_{i,j,k}
-
y^{(\mathcal M)}_{i,j,k}(\theta)
\right)^2
}{
2\sigma^2
}
\right].
$$

Taking logs,

$$
\begin{aligned}
\ell(\boldsymbol{\mu}^{(\mathcal M)},\sigma^2;\mathbf y,\mathcal M)
&=
-\frac{N}{2}\ln(2\pi)
-
\frac{N}{2}\ln(\sigma^2)
-
\frac{1}{2\sigma^2}
\sum_{i,j,k}
\left(
y_{i,j,k}
-
y^{(\mathcal M)}_{i,j,k}(\theta)
\right)^2.
\end{aligned}
$$

We now want the parameter values that maximize this likelihood, subject to two constraints:

$$
\boldsymbol{\mu}^{(\mathcal M)}\in\mathcal M,
\qquad
\sigma^2>0.
$$

The first constraint means that the mean vector must have the structure allowed by model $\mathcal M$. For example, the full model allows the interaction component, while the reduced model does not.

From the least-squares section, we already know how to fit the mean structure of a model by minimizing its squared error. We denote the fitted mean parameters under model $\mathcal M$ by

$$
\widehat y^{(\mathcal M)}_{i,j,k}.
$$

After fitting the mean structure of $\mathcal M$, the log-likelihood becomes

$$
\ell(\widehat{\boldsymbol{\mu}}^{(\mathcal M)},\sigma^2;\mathbf y,\mathcal M)
=
-\frac{N}{2}\ln(2\pi)
-
\frac{N}{2}\ln(\sigma^2)
-
\frac{\sum_{i,j,k}
\left(
y_{i,j,k}
-
\widehat y^{(\mathcal M)}_{i,j,k}
\right)^2}{2\sigma^2}.
$$

Recall that

$$
\mathrm{SSE}_{\mathcal M}
=
\sum_{i,j,k}
\left(
y_{i,j,k}
-
\widehat y^{(\mathcal M)}_{i,j,k}
\right)^2.
$$

Therefore,

$$
\ell(\widehat{\boldsymbol{\mu}}^{(\mathcal M)},\sigma^2;\mathbf y,\mathcal M)
=
-\frac{N}{2}\ln(2\pi)
-
\frac{N}{2}\ln(\sigma^2)
-
\frac{\mathrm{SSE}_{\mathcal M}}{2\sigma^2}.
$$

Now maximize this expression over $\sigma^2$. Differentiating with respect to $\sigma^2$,

$$
\frac{\partial \ell}{\partial \sigma^2}
=
-\frac{N}{2\sigma^2}
+
\frac{\mathrm{SSE}_{\mathcal M}}{2(\sigma^2)^2}.
$$

Setting this derivative to zero gives

$$
-\frac{N}{2\sigma^2}
+
\frac{\mathrm{SSE}_{\mathcal M}}{2(\sigma^2)^2}
=
0.
$$

Multiplying both sides by $2(\sigma^2)^2$,

$$
-N\sigma^2+\mathrm{SSE}_{\mathcal M}=0.
$$

Therefore,

$$
\widehat{\sigma^2}_{\mathcal M,\mathrm{MLE}}
=
\frac{\mathrm{SSE}_{\mathcal M}}{N}.
$$

Substituting both maximum-likelihood estimates back into the likelihood gives the maximized likelihood of model $\mathcal M$:

$$
\widehat L_{\mathcal M}
=
L(\widehat{\boldsymbol{\mu}}^{(\mathcal M)},\widehat{\sigma^2}_{\mathcal M,\mathrm{MLE}};\mathbf y,\mathcal M).
$$

Using the previous expression,

$$
\begin{aligned}
\widehat L_{\mathcal M}
&=
(2\pi e)^{-N/2}
\left(
\frac{\mathrm{SSE}_{\mathcal M}}{N}
\right)^{-N/2}.
\end{aligned}
$$

Unfortunately, a single likelihood value by itself is still hard to interpret.

Likelihood is best interpreted comparatively. It becomes useful when we compare two likelihood values.

### What Are We Even Doing?

Before we proceed further, I think we need to take a moment to reflect on what we have done.

We want to know what likely causes each participant's score to be different from the grand mean, and have successfully decomposed one individual observation into multiple mutually orthogonal sources. 

Then we have vectorized one single observation to the whole dataset, and used squared Euclidean norms to facilitate the orthogonality, landing ourselves with an SS decomposition formula, which tells us how much each likely source contributes to the deviation of scores from the grand mean.

But decomposition by itself is still not enough, we want to know whether one likely source (here being A $\times$ B) is just reflecting residual errors.

Intuitively, we turned to $\frac{\mathrm{SS_{A\times B}}}{\mathrm{SS_E}}$, which is reasonable, but the ratio had no standard of interpretation.

Then after some pondering, we reframed the problem as a model comparison problem and introduced $\mathrm{SSE}_{\mathcal M}$.

And now under the normal-error assumption, we have the maximized likelihood $\widehat L_{\mathcal M}$.

One might feel that we are just replacing one number with another arbitrarily.

But in statistics, replacing one number with another is never arbitrary when the two numbers are trying to answer different kinds of questions. 

The sum-of-squares decomposition is a *descriptive statistic*. It summarizes what is present in the data we happen to have. 

A descriptive statistic therefore cannot be right or wrong, because it merely rearranges our data. It does not make any claim, nor any prediction about this world. This is why our attempt to use $\frac{\mathrm{SS_{A\times B}}}{\mathrm{SS_E}}$ or SSE to tell whether our decomposed A $\times$ B term is just a conflation of residual errors fails. A description cannot tell us something beyond what is already available to us.

Our normality assumption for residual errors however, is a different kind of object. It is a probability-theoretic claim about the data generating processes. With that, we are asking how things would play out in many probable worlds. 

However, a probability-theoretic claim not anchored in this world we are living in also cannot tell us what is right or wrong.

Inferential statistics is, in a sense, an attempt to rule out many probable worlds using data from this world, by using descriptive statistics and probability-theoretic tools together. 

A descriptive quantity cannot be right or wrong, and for our problem it is not that informative either because it has nothing to be checked against. 

A generative model, say a random variable $X \sim \mathcal{N}(0,1)$, is also not that informative, because although it can be right or wrong, it has nothing to do with this world we live in.

But a claim about how our data is generated is different. It is anchored by the data we have observed, it can predict what kind of data is probable, and the claim itself can be embarrassed by our observations. 

Therefore, by passing from $\frac{\mathrm{SS_{A\times B}}}{\mathrm{SS_E}}$ to $\widehat L_{\mathcal M}$ we are not solely using increasingly complex tools for the sake of complexity. It is what will allow us, in the next section, to construct a *probabilistic standard* for our earlier ratio.

### Likelihood Ratio Testing

Now, we want to compare the reduced and full models by comparing their maximized likelihoods:

$$
\begin{align*}
\Lambda_{\mathrm{A\times B}}
&=
\frac{
\widehat L_{\mathcal M_{R,\mathrm{A\times B}}}
}{
\widehat L_{\mathcal M_F}
}\\
&=\frac{(2\pi e)^{-\frac{N}{2}} \left( \frac{\mathrm{SSE}_{\mathcal{M}_{R,\mathrm{A\times B}}}}{N} \right)^{-\frac{N}{2}}}{(2\pi e)^{-\frac{N}{2}} \left( \frac{\mathrm{SSE}({\mathcal M_F})}{N} \right)^{-\frac{N}{2}}}\\
&= \left(\frac{
\mathrm{SSE}_{\mathcal{M}_{R,\mathrm{A\times B}}}
}{
\mathrm{SSE}_{\mathcal{M}_F}
}\right)^{-\frac{N}{2}}
.
\end{align*}
$$

If the reduced model fits almost as well as the full model, then

$$
\widehat L_{\mathcal M_{R,\mathrm{A\times B}}}
\approx
\widehat L_{\mathcal M_F},
$$

so

$$
\Lambda_{\mathrm{A\times B}}\approx 1,
$$

which means removing the interaction component causes little loss of likelihood.

But if the reduced model fits much worse than the full model, then

$$
\widehat L_{\mathcal M_{R,\mathrm{A\times B}}}
\ll
\widehat L_{\mathcal M_F},
$$

and

$$
\Lambda_{\mathrm{A\times B}}\ll 1,
$$

which means removing the interaction component causes a large loss of likelihood. 

Therefore, stronger evidence against the reduced model corresponds to a smaller likelihood ratio.

Taking logs of $\Lambda_{\mathrm{A\times B}}$:

$$
\ln \Lambda_{\mathrm{A\times B}}
=
-\frac{N}{2}
\ln\left(
\frac{
\mathrm{SSE}_{\mathcal M_{R,\mathrm{A\times B}}}
}{
\mathrm{SSE}({\mathcal M_F})
}
\right).
$$

Therefore,

$$
-2\ln \Lambda_{\mathrm{A\times B}}
=
N
\ln\left(
\frac{
\mathrm{SSE}_{\mathcal M_{R,\mathrm{A\times B}}}
}{
\mathrm{SSE}({\mathcal M_F})
}
\right).
$$

Since the sign has been flipped by multiplying by $-2$, stronger evidence against the reduced model now corresponds to a larger $-2\ln \Lambda_{\mathrm{A\times B}}$.


Recall that 

$$
\mathrm{SSE}_{\mathcal{M}_{F}}=\|\hat{\boldsymbol{\varepsilon}}
\|^2=\mathrm{SS_E},
$$

and

$$
\mathrm{SSE}_{\mathcal{M}_{R, \mathrm{A\times B}}}=\|\hat{\boldsymbol{\varepsilon}}^{(\mathcal{M}_{R, \mathrm{A\times B}})}\|^2 =\mathrm{SS_E}
+
\mathrm{SS_{A\times B}}.
$$

Thus,

$$
\frac{
\mathrm{SSE}_{\mathcal M_{R,\mathrm{A\times B}}}
}{
\mathrm{SSE}({\mathcal M_F})
}=
1+\frac{\mathrm{SS_{A\times B}}}{\mathrm{SS_E}}
\geq 1.
$$

The ratio inside the logarithm is at least $1$. The farther this ratio is above $1$, the more residual error is added by removing the interaction component, and the larger our $-2\ln \Lambda_{\mathrm{A\times B}}$ statistic becomes, suggesting stronger evidence against the reduced model.

Thus,

$$
-2\ln\Lambda_{\mathrm{A\times B}}
=
N\ln\left(
1+
\frac{\mathrm{SS_{A\times B}}}{\mathrm{SS_E}}
\right).
$$

Because $N>0$, and $\ln(1+x)$ is strictly increasing for $x\geq 0$, the $-2\ln \Lambda_{\mathrm{A\times B}}$ statistic is a strictly increasing function of

$$
\frac{\mathrm{SS_{A\times B}}}{\mathrm{SS_E}}.
$$

Therefore, the raw ratio

$$
\frac{\mathrm{SS_{A\times B}}}{\mathrm{SS_E}}
$$

is monotone-equivalent to the $-2\ln \Lambda_{\mathrm{A\times B}}$ statistic evidence for our reduced-versus-full comparison.

As it turns out, our original ratio was not outright wrong. It was pointing toward the right comparison.

However, $\frac{\mathrm{SS_{A\times B}}}{\mathrm{SS_E}}$ cannot be called a test statistic yet. It tells us the direction and ordering of evidence, but not the reference standard for deciding how large is large enough. 

### Degrees of Freedom

By using likelihood, we have known which comparison matters and why. But yet we need to *calibrate* that comparison.

Before that, we first go back to the geometry of our decomposition.

$$
\mathbf{y}-\hat{\boldsymbol{\mu}}=\hat{\boldsymbol{\alpha}}+\hat{\boldsymbol{\beta}}+\widehat{\boldsymbol{\alpha\beta}}+\hat{\boldsymbol{\varepsilon}}.
$$

Here, each component vector is allowed to move inside a certain subspace $W$. We call the dimension of that subspace, $\dim W$, its degrees of freedom.

Recall the sum-to-zero constraints we imposed on the model:

$$
\sum_i \alpha_i = 0,
\qquad
\sum_j \beta_j = 0,
$$

and

$$
\sum_i(\alpha\beta)_{i,j}=0
\quad\text{for every }j,
\qquad
\sum_j(\alpha\beta)_{i,j}=0
\quad\text{for every }i.
$$

These constraints actually tell us how many values each component is free to vary over. This number is its degrees of freedom.

Take the interaction component as an example.

The interaction term contains one value for each feedback-by-difficulty cell:

$$
(\alpha\beta)_{i,j},
\qquad
i=1,\ldots,I,
\qquad
j=1,\ldots,J.
$$

At first, this looks like $IJ$ numbers. But they are not all free, because the interaction component must satisfy both row-sum and column-sum constraints:

$$
\sum_i(\alpha\beta)_{i,j}=0
\quad\text{for every }j,
$$

and

$$
\sum_j(\alpha\beta)_{i,j}=0
\quad\text{for every }i.
$$

A simple way to count the free values is to fill in the interaction table.

First choose the values in the upper-left $(I-1)\times(J-1)$ block freely:

$$
(\alpha\beta)_{i,j},
\qquad
i=1,\ldots,I-1,
\qquad
j=1,\ldots,J-1.
$$

There are

$$
(I-1)(J-1)
$$

such values.

Once these values are chosen, the remaining values are forced by the sum-to-zero constraints.

For each row $i=1,\ldots,I-1$, the final column value must make the row sum zero:

$$
(\alpha\beta)_{i,J}
=
-\sum_{j=1}^{J-1}(\alpha\beta)_{i,j}.
$$

For each column $j=1,\ldots,J-1$, the final row value must make the column sum zero:

$$
(\alpha\beta)_{I,j}
=
-\sum_{i=1}^{I-1}(\alpha\beta)_{i,j}.
$$

Finally, the bottom-right value is also forced. It must satisfy the last row sum and the last column sum:

$$
(\alpha\beta)_{I,J}
=
-\sum_{j=1}^{J-1}(\alpha\beta)_{I,j}
=
-\sum_{i=1}^{I-1}(\alpha\beta)_{i,J}.
$$

Therefore, the interaction component has only

$$
df_{\mathrm{A\times B}}
=
(I-1)(J-1)
$$

free values.

Similarly, for the feedback component $A$, there are $I$ feedback-level deviations:

$$
\alpha_1,\alpha_2,\ldots,\alpha_I.
$$

But they must satisfy

$$
\sum_i \alpha_i=0.
$$

So once $I-1$ values are chosen, the last one is determined. Therefore,

$$
df_\mathrm{A}=I-1.
$$

The same logic applies to the difficulty component $B$. Since there are $J$ difficulty-level deviations and one sum-to-zero constraint,

$$
df_\mathrm{B}=J-1.
$$

For the residual component $E$, the residuals vary within each cell. In cell $(i,j)$, there are $K$ residuals:

$$
\varepsilon_{i,j,1},\varepsilon_{i,j,2},\ldots,\varepsilon_{i,j,K}.
$$

In the full model, the fitted value for observation $k$ in cell $(i,j)$ is

$$
\widehat y_{i,j,k}
=
\hat\mu
+
\hat{\alpha}_i
+
\hat{\beta}_j
+
\widehat{(\alpha\beta)}_{i,j}.
$$

Recall the definitions:

$$
\hat{\alpha}_i
=
\bar y_{i,.,.}-\hat\mu,
$$

$$
\hat{\beta}_j
=
\bar y_{.,j,.}-\hat\mu,
$$

and

$$
\widehat{(\alpha\beta)}_{i,j}
=
\bar y_{i,j,.}
-
\bar y_{i,.,.}
-
\bar y_{.,j,.}
+
\hat\mu.
$$

Substituting these into the fitted value gives

$$
\begin{aligned}
\widehat y_{i,j,k}
&=
\hat\mu
+
(\bar y_{i,.,.}-\hat\mu)
+
(\bar y_{.,j,.}-\hat\mu)
+
(\bar y_{i,j,.}-\bar y_{i,.,.}-\bar y_{.,j,.}+\hat\mu) \\
&=
\bar y_{i,j,.}.
\end{aligned}
$$

So in the full model, every observation in cell $(i,j)$ receives the same fitted value:

$$
\widehat y_{i,j,k}
=
\bar y_{i,j,.}.
$$

Therefore, the residual for observation $k$ in cell $(i,j)$ is

$$
\widehat{\varepsilon}_{i,j,k}
=
y_{i,j,k}
-
\bar y_{i,j,.}.
$$

Now sum these residuals within the same cell:

$$
\begin{aligned}
\sum_k \widehat{\varepsilon}_{i,j,k}
&=
\sum_k
\left(
y_{i,j,k}
-
\bar y_{i,j,.}
\right) \\
&=
\sum_k y_{i,j,k}
-
\sum_k \bar y_{i,j,.} \\
&=
\sum_k y_{i,j,k}
-
K\bar y_{i,j,.}.
\end{aligned}
$$

But by definition,

$$
\bar y_{i,j,.}
=
\frac{1}{K}
\sum_k y_{i,j,k}.
$$

So

$$
K\bar y_{i,j,.}
=
\sum_k y_{i,j,k}.
$$

Therefore,

$$
\sum_k \widehat{\varepsilon}_{i,j,k}
=
0.
$$

Thus, within each cell, the $K$ residuals are not all free. Once $K-1$ residuals are known, the last one is forced to make the cell residual sum equal to zero.

Therefore, each cell contributes $K-1$ residual degrees of freedom. Since there are $IJ$ cells,

$$
df_{\mathrm{E}}=IJ(K-1).
$$

Finally, for the total centered data vector,

$$
\mathbf y-\widehat{\boldsymbol\mu},
$$

there are $N=IJK$ observations, but centering by the grand mean imposes one constraint:

$$
\sum_{i,j,k}(y_{i,j,k}-\hat\mu)=0.
$$

Thus,

$$
df_T=N-1=IJK-1.
$$

In this chapter, degrees of freedom mean the number of independent directions in which a component can vary after the model constraints have been imposed.

In the later chapters when we discuss the geometry of linear models, we will describe the same idea using projection subspaces and their dimensions.

### Calibration

We now know two things. First, our likelihood-ratio derivation showed that our original ratio

$$
\frac{\mathrm{SS_{A\times B}}}{\mathrm{SS_E}}
$$

points in the right direction. Larger values correspond to larger likelihood-ratio evidence against the reduced model.

Second, our degrees-of-freedom derivation showed that the numerator and denominator of our original ratio come from spaces with different dimensions:

$$
df_{\mathrm{A\times B}}=(I-1)(J-1),
\qquad
df_{\mathrm{E}}=IJ(K-1).
$$

A squared length accumulated over two directions should not be compared directly with a squared length accumulated over fifty-four directions. So, intuitively, the ratio should compare squared length *per available direction*:

$$
\frac{
\mathrm{SS_{A\times B}}/df_{\mathrm{A\times B}}
}{
\mathrm{SS_E}/df_{\mathrm E}
}.
$$

This is the dimension-adjusted version of our original comparison.

The numerator measures how much squared variation the interaction component captures per interaction degree of freedom. The denominator measures how much squared variation remains as residual error per residual degree of freedom.

If the reduced model is adequate, then the fitted interaction component is only fitting random error. In that case, the numerator should be comparable to the denominator. If the numerator is much larger than the denominator, the interaction component has captured more variation per dimension than we would expect from residual noise alone.

Yet this is still not the final object. Even with the per-dimension form, we don't have a reference distribution for it. Thus, it does not tell us what values should be considered ordinary or unusual under the reduced model yet.

This is where *calibration* enters.

Calibration tries to answer the problem:

> If our reduced model were true, what values of this comparison would be ordinary?

It does so by building a reference standard for interpreting a statistic, i.e., constructing a reference distribution under the reduced model by using something called a **pivot**.

A pivot is a statistic whose distribution is known under the null hypothesis and does not depend on unknown parameters. 

From here on, we treat the estimators as functions of the random vector $\mathbf{Y}$ rather than the observed vector $\mathbf{y}$. Thus quantities such as $\widehat{\boldsymbol{\alpha\beta}}$ and $\mathrm{SS_{A\times B}}$ are now random variables, even though their observed realized values are fixed numbers once the data have been collected.

Recall our normal-error assumption:

$$
\varepsilon_{i,j,k}\overset{\mathrm{i.i.d.}}{\sim}\mathcal N(0,\sigma^2).
$$

Equivalently, we can write

$$
\varepsilon_{i,j,k}
=
\sigma z_{i,j,k},
\qquad
z_{i,j,k}\overset{\mathrm{i.i.d.}}{\sim}\mathcal N(0,1).
$$

So the entire error vector can be written as

$$
\boldsymbol\varepsilon
=
\sigma \mathbf z,
\qquad
\mathbf z\sim \mathcal N(\mathbf 0,I).
$$

Under the null hypothesis

$$
H_0^{A\times B}:(\alpha\beta)_{i,j}=0
\quad\text{for all }i,j,
$$

the fitted interaction component is a projection of the error vector onto the interaction subspace. Write this projection as $P_{\mathrm{A\times B}}\boldsymbol\varepsilon$. Then

$$
\widehat{\boldsymbol{\alpha\beta}}
=
P_{\mathrm{A\times B}}\boldsymbol\varepsilon
=
P_{\mathrm{A\times B}}(\sigma\mathbf z)
=
\sigma P_{\mathrm{A\times B}}\mathbf z.
$$

Therefore,

$$
\mathrm{SS_{A\times B}}
=
\left\|
\widehat{\boldsymbol{\alpha\beta}}
\right\|^2
=
\left\|
\sigma P_{\mathrm{A\times B}}\mathbf z
\right\|^2
=
\sigma^2
\left\|
P_{\mathrm{A\times B}}\mathbf z
\right\|^2.
$$

Similarly, if $P_{\mathrm{E}}$ is the projection onto the residual subspace, then

$$
\hat{\boldsymbol{\varepsilon}}
=
P_{\mathrm{E}}\boldsymbol\varepsilon
=
\sigma P_{\mathrm{E}}\mathbf z,
$$

so

$$
\mathrm{SS_E}
=
\left\|
\hat{\boldsymbol{\varepsilon}}
\right\|^2
=
\sigma^2
\left\|
P_{\mathrm{E}}\mathbf z
\right\|^2.
$$

Therefore, both $\mathrm{SS_{A\times B}}$ and $\mathrm{SS_E}$ are measured on the scale of $\sigma^2$. If the residual noise were larger, both sums of squares would tend to be larger. 

So, a useful calibrated statistic should remove this unknown scale.

In addition, we need to know the distribution of those projected squared lengths.

To achieve these, we will use a classical result called **Cochran's theorem**.

A simplified version of it is used here. The full theorem is usually stated in terms of quadratic forms and projection matrices. [^cochran1934] We will discuss more on it in the later chapters.

!!! info "Cochran's Theorem, Simplified"

    If a normal error vector is decomposed into mutually orthogonal components, then the squared lengths of these components, after division by $\sigma^2$, follow independent $\chi^2$ distributions.  

    The degrees of freedom of each $\chi^2$ distribution equals the dimension of the corresponding component space.


From the projection representation above,

$$
\frac{\mathrm{SS_{A\times B}}}{\sigma^2}
=
\left\|
P_{\mathrm{A\times B}}\mathbf z
\right\|^2.
$$

Cochran's theorem then gives

$$
\frac{\mathrm{SS_{A\times B}}}{\sigma^2}
=
\left\|
P_{\mathrm{A\times B}}\mathbf z
\right\|^2
\sim
\chi^2_{df_{\mathrm{A\times B}}}.
$$

Similarly, for the residual component:

$$
\frac{\mathrm{SS_E}}{\sigma^2}
=
\left\|
P_{\mathrm{E}}\mathbf z
\right\|^2
\sim
\chi^2_{df_{\mathrm{E}}}.
$$

Because the interaction subspace and the residual subspace are orthogonal, Cochran's theorem also gives independence of these two $\chi^2$ variables.

Cochran's theorem also makes our earlier intuition precise:

If

$$
\frac{\mathrm{SS_{A\times B}}}{\sigma^2}
\sim
\chi^2_{df_{\mathrm{A\times B}}},
$$

then, because a random variable that conforms to a $\chi^2$ distribution with $d$ degrees of freedom has expectation $d$,

$$
\mathbb{E}\left[
\frac{\mathrm{SS_{A\times B}}}{\sigma^2}
\right]
=
df_{\mathrm{A\times B}}.
$$

Multiplying both sides by $\sigma^2$,

$$
\mathbb{E}\left[
\mathrm{SS_{A\times B}}
\right]
=
df_{\mathrm{A\times B}}\sigma^2.
$$

Therefore,

$$
\mathbb{E}\left[
\frac{\mathrm{SS_{A\times B}}}{df_{\mathrm{A\times B}}}
\right]
=
\sigma^2.
$$

Similarly,

$$
\mathbb{E}\left[
\frac{\mathrm{SS_E}}{df_{\mathrm E}}
\right]
=
\sigma^2.
$$

So under the null hypothesis, both dimension-adjusted squared lengths are unbiased estimators of the same variance $\sigma^2$, which makes them comparable.

Now recall the definition of $F$ distribution.

If

$$
U\sim \chi^2_{d_1},
\qquad
V\sim \chi^2_{d_2},
$$

and $U$ and $V$ are independent, then

$$
\frac{U/d_1}{V/d_2}
\sim
F_{d_1,d_2}.
$$

Therefore,

$$
\frac{
\left(\mathrm{SS_{A\times B}}/\sigma^2\right)/df_{\mathrm{A\times B}}
}{
\left(\mathrm{SS_E}/\sigma^2\right)/df_{\mathrm{E}}
}
\sim
F_{df_{\mathrm{A\times B}},df_{\mathrm{E}}}.
$$

The unknown $\sigma^2$ cancels, giving

$$
F_\mathrm{{A\times B}}
=
\frac{
\mathrm{SS_{A\times B}}/df_{\mathrm{A\times B}}
}{
\mathrm{SS_E}/df_{\mathrm{E}}
}
\sim
F_{df_{\mathrm{A\times B}},df_{\mathrm{E}}}.
$$

This marks the end of our calibration steps.

$F_\mathrm{{A\times B}}$ is the pivot we were looking for. Under the null hypothesis of no interaction, its distribution is known, without depending on unknown variables.

## Two-way Analysis of Variance

We can finally name the procedure we have derived.

We began with a balanced two-factor design, decomposed the centered data vector into feedback, difficulty, interaction, and residual components, used likelihood to identify the relevant reduced-versus-full comparison, and then used degrees of freedom plus Cochran's theorem to calibrate the comparison.

This procedure is the classical **two-way analysis of variance**, or **two-way ANOVA**.

In this balanced design, applying the same model comparison and calibration logic to the other fitted components gives:

$$
F_\mathrm{A}
=
\frac{\mathrm{SS_A}/df_\mathrm{A}}{\mathrm{SS_E}/df_\mathrm{E}},
$$

$$
F_\mathrm{B}
=
\frac{\mathrm{SS_B}/df_\mathrm{B}}{\mathrm{SS_E}/df_\mathrm{E}},
$$

and

$$
F_\mathrm{{A\times B}}
=
\frac{\mathrm{SS_{A\times B}}/df_{\mathrm{A\times B}}}{\mathrm{SS_E}/df_{\mathrm{E}}}.
$$

Under the corresponding null hypotheses,

$$
H_0^\mathrm{A}:\alpha_i=0\quad\text{for all }i,
$$

$$
H_0^\mathrm{B}:\beta_j=0\quad\text{for all }j,
$$

and

$$
H_0^\mathrm{{A\times B}}:(\alpha\beta)_{i,j}=0\quad\text{for all }i,j,
$$

these statistics follow their corresponding $F$ distributions:

$$
F_\mathrm{A}\sim F_{df_\mathrm{A},df_{\mathrm{E}}},
$$

$$
F_\mathrm{B}\sim F_{df_\mathrm{B},df_{\mathrm{E}}},
$$

and

$$
F_\mathrm{{A\times B}}\sim F_{df_{\mathrm{A\times B}},df_{\mathrm{E}}}.
$$

### The ANOVA Table

People often use a table, called the ANOVA table to organize the quantities we have derived.

| Source | SS | df | MS | F |
|---|---:|---:|---:|---:|
| Feedback $\mathrm{A}$ | $\mathrm{SS_A}$ | $I-1$ | $\mathrm{SS_A}/df_\mathrm{A}$ | $\mathrm{MS_A}/\mathrm{MS_E}$ |
| Difficulty $\mathrm{B}$ | $\mathrm{SS_B}$ | $J-1$ | $\mathrm{SS_B}/df_\mathrm{B}$ | $\mathrm{MS_B}/\mathrm{MS_E}$ |
| Interaction $\mathrm{A\times B}$ | $\mathrm{SS_{A\times B}}$ | $(I-1)(J-1)$ | $\mathrm{SS_{A\times B}}/df_\mathrm{{A\times B}}$ | $\mathrm{MS_{A\times B}}/\mathrm{MS_E}$ |
| Error | $\mathrm{SS_E}$ | $IJ(K-1)$ | $\mathrm{SS_E}/df_\mathrm{E}$ | |
| Total | $\mathrm{SS_T}$ | $IJK-1$ | | |

Here,

$$
\mathrm{MS}
=
\frac{\mathrm{SS}}{df}
$$


means **mean square**, or squared length per degree of freedom.

### Worked ANOVA Result for the Example

For the feedback-by-difficulty example in the previous section, we have

$$
I=3,\qquad J=2,\qquad K=10,\qquad N=60.
$$

The numerical two-way ANOVA table is:

| Source | SS | df | MS | F | p |
|---|---:|---:|---:|---:|---:|
| Feedback $\mathrm{A}$ | $333.33$ | $2$ | $166.67$ | $89.59$ | $7.03\times 10^{-18}$ |
| Difficulty $\mathrm{B}$ | $201.67$ | $1$ | $201.67$ | $108.40$ | $1.61\times 10^{-14}$ |
| Interaction $\mathrm{A\times B}$ | $6603.33$ | $2$ | $3301.67$ | $1774.74$ | $5.54\times 10^{-50}$ |
| Error | $100.46$ | $54$ | $1.86$ | | |
| Total | $7238.79$ | $59$ | | | |

Thus, for this dataset, feedback type, task difficulty, and especially their interaction all account for much more variation than would be expected from the residual variation alone under the corresponding null hypotheses.

!!! note

    The values in our example data are computer generated for illustrative purposes only. Effects in real feedback paradigms are far smaller.


??? info "Click to expand the hand calculation using bracket form"

    The cell totals are:

    | Feedback type | $T_{i,1,.}$ for $B_1$ Easy | $T_{i,2,.}$ for $B_2$ Difficult | $T_{i,.,.}$ |
    |---|---:|---:|---:|
    | $A_1$ Encouraging | $50$ | $250$ | $300$ |
    | $A_2$ Neutral | $100$ | $100$ | $200$ |
    | $A_3$ Critical | $255$ | $-55$ | $200$ |
    | $T_{.,j,.}$ | $405$ | $295$ | $T_{.,.,.}=700$ |

    First calculate the correction term:

    $$
    C
    =
    \frac{T_{.,.,.}^2}{IJK}
    =
    \frac{700^2}{3\cdot 2\cdot 10}
    =
    8166.67.
    $$

    The sum of squared observations is

    $$
    \sum_{i,j,k}y_{i,j,k}^2=15405.46.
    $$

    Therefore,

    $$
    \mathrm{SS_T}
    =
    \sum_{i,j,k}y_{i,j,k}^2-C
    =
    15405.46-8166.67
    =
    7238.79.
    $$

    For feedback type $A$,

    $$
    \begin{aligned}
    \mathrm{SS_A}
    &=
    \sum_i\frac{T_{i,.,.}^2}{JK}-C \\
    &=
    \frac{300^2+200^2+200^2}{2\cdot 10}
    -
    8166.67 \\
    &=
    333.33.
    \end{aligned}
    $$

    For task difficulty $B$,

    $$
    \begin{aligned}
    \mathrm{SS_B}
    &=
    \sum_j\frac{T_{.,j,.}^2}{IK}-C \\
    &=
    \frac{405^2+295^2}{3\cdot 10}
    -
    8166.67 \\
    &=
    201.67.
    \end{aligned}
    $$

    The cell sum of squares is

    $$
    \begin{aligned}
    \mathrm{SS_{cell}}
    &=
    \sum_{i,j}\frac{T_{i,j,.}^2}{K}-C \\
    &=
    \frac{
    50^2+250^2+100^2+100^2+255^2+(-55)^2
    }{10}
    -
    8166.67 \\
    &=
    7138.33.
    \end{aligned}
    $$

    Hence,

    $$
    \begin{aligned}
    \mathrm{SS_{A\times B}}
    &=
    \mathrm{SS_{cell}}-\mathrm{SS_A}-\mathrm{SS_B} \\
    &=
    7138.33-333.33-201.67 \\
    &=
    6603.33.
    \end{aligned}
    $$

    Finally,

    $$
    \begin{aligned}
    \mathrm{SS_E}
    &=
    \mathrm{SS_T}
    -
    \mathrm{SS_A}
    -
    \mathrm{SS_B}
    -
    \mathrm{SS_{A\times B}} \\
    &=
    7238.79-333.33-201.67-6603.33 \\
    &=
    100.46.
    \end{aligned}
    $$

    The degrees of freedom are:

    $$
    df_A=I-1=2,
    \qquad
    df_B=J-1=1,
    $$

    $$
    df_{A\times B}=(I-1)(J-1)=2,
    \qquad
    df_E=IJ(K-1)=54,
    $$

    and

    $$
    df_T=IJK-1=59.
    $$

    Therefore,

    $$
    \mathrm{MS_A}=\frac{333.33}{2}=166.67,
    \qquad
    \mathrm{MS_B}=\frac{201.67}{1}=201.67,
    $$

    $$
    \mathrm{MS_{A\times B}}=\frac{6603.33}{2}=3301.67,
    \qquad
    \mathrm{MS_E}=\frac{100.46}{54}=1.86.
    $$

    The calibrated $F$ statistics are:

    $$
    F_A=\frac{166.67}{1.86}=89.59,
    $$

    $$
    F_B=\frac{201.67}{1.86}=108.40,
    $$

    and

    $$
    F_{A\times B}=\frac{3301.67}{1.86}=1774.74.
    $$

## Section Review

In this section, we asked when a sum of squares should be treated as statistically meaningful.

We first saw that a raw comparison such as

$$
\frac{\mathrm{SS_{A\times B}}}{\mathrm{SS_E}}
$$

does not provide a standard for interpretation.

To make the comparison more principled, we reframed the problem as a comparison between a reduced model and a full model. For the interaction term, we showed that

$$
\mathrm{SS_{A\times B}}
=
\mathrm{SSE}_{\mathcal M_{R,\mathrm{A\times B}}}
-
\mathrm{SSE}({\mathcal M_F}).
$$

Thus, the interaction sum of squares can be interpreted as the reduction in residual squared error obtained by allowing the interaction component into the model.

Under the normal-error assumption, likelihood-ratio testing showed that this comparison is connected to maximized likelihood:

$$
-2\ln\Lambda_{\mathrm{A\times B}}
=
N\ln\left(
1+
\frac{\mathrm{SS_{A\times B}}}{\mathrm{SS_E}}
\right).
$$

So the original ratio was not completely arbitrary. It is monotone-equivalent to the likelihood-ratio evidence for this reduced-versus-full comparison.

However, likelihood ordering alone was still not enough. We needed a reference distribution. Degrees of freedom told us how many independent directions each component could vary in, and Cochran's theorem gave the finite-sample calibration:

$$
F_{\mathrm{A\times B}}
=
\frac{
\mathrm{SS_{A\times B}}/df_{\mathrm{A\times B}}
}{
\mathrm{SS_E}/df_{\mathrm E}
}
\sim
F_{df_{\mathrm{A\times B}},df_{\mathrm E}}
$$

under the null hypothesis of no interaction.

Applying the same logic to all fitted components gives the classical balanced two-way ANOVA.

In the next section, we will move from constructing the ANOVA table to asking what its results actually mean for the experiment. The omnibus $F$ tests tell us that some fitted component is too large to dismiss as residual fluctuation, but they do not automatically tell us the experimental story. 

We will therefore discuss how to interpret main effects and interactions, and how to use follow-up comparisons such as simple main effects, post hoc comparisons, and interaction contrasts to connect the numerical table back to the design.


[^cochran1934]: William G. Cochran, “The Distribution of Quadratic Forms in a Normal System, with Applications to the Analysis of Covariance,” *Mathematical Proceedings of the Cambridge Philosophical Society* 30, no. 2 (1934): 178–191.
