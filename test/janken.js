import assert from 'assert'
import Janken from '../src/janken'

describe('Janken', () => {
    const janken = new Janken()

    describe('勝敗の判定が正しいか', () => {
        describe('コンピューターがグーの場合', () => {
            it('人間がグーなら引き分け', () => {
                janken.pon(0, 0)
                assert.equal(janken.getScores()[0].judgment, 0)
            })
            it('人間がチョキなら負け', ()=> {
                janken.pon(1, 0)
                assert.equal(janken.getScores()[0].judgment, 2)
            })
            it('人間がパーなら勝ち', ()=> {
                janken.pon(2, 0)
                assert.equal(janken.getScores()[0].judgment, 1)
            })
        })

        describe('コンピューターがチョキ時の場合', ()=>{
            it('人間がグーなら勝ち', () => {
                janken.pon(0, 1)
                assert.equal(janken.getScores()[0].judgment, 1)
            })
            it('人間がチョキなら引き分け', ()=> {
                janken.pon(1, 1)
                assert.equal(janken.getScores()[0].judgment, 0)
            })
            it('人間がパーなら負け', ()=> {
                janken.pon(2, 1)
                assert.equal(janken.getScores()[0].judgment, 2)
            })
        })

        describe('コンピューターがパー時の場合', ()=>{
            it('人間がグーなら負け', () => {
                janken.pon(0, 2)
                assert.equal(janken.getScores()[0].judgment, 2)
            })
            it('人間がチョキなら勝ち', ()=> {
                janken.pon(1, 2)
                assert.equal(janken.getScores()[0].judgment, 1)
            })
            it('人間がパーなら引き分け', ()=> {
                janken.pon(2, 2)
                assert.equal(janken.getScores()[0].judgment, 0)
            })
        })

    })
})